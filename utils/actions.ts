'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProfileImage, Username, validateWithSchema } from './schema';
import db from './db';
import { getAuthUser, getAuthUserWithProfile } from './auth';
import { actionFunction } from './types';
import { adminAuthClient, uploadImage } from './supabase';
import { revalidatePath } from 'next/cache';

export const signIn = async (formData: FormData) => {
  const provider = formData.get('provider') as 'google' | 'kakao';

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/profile/setup`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect(data.url!);
};

export const signOut = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteAccountAction = async () => {
  try {
    const user = await getAuthUser();
    if (!user) throw new Error('로그인이 필요합니다.');

    // DB 프로필 삭제
    await db.profile.delete({
      where: { supabaseId: user.id },
    });

    // Supabase Auth 유저 삭제
    const { error } = await adminAuthClient.deleteUser(user.id);
    if (error) throw new Error(error.message);
  } catch (error) {
    return renderError(error);
  }

  redirect('/');
};

export const checkNickname = async (nickname: string) => {
  try {
    const existingNickname = await db.profile.findUnique({
      where: { username: nickname },
    });

    if (existingNickname) {
      return { available: false, message: '이미 존재하는 닉네임입니다.' };
    }

    validateWithSchema(Username, nickname);

    return { available: true, message: '사용 가능한 닉네임입니다.' };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '오류가 발생했습니다.';
    return { available: false, message };
  }
};

const renderError = (error: unknown) => ({
  success: false,
  message: error instanceof Error ? error.message : '오류가 발생했습니다.',
});

export const createProfileAction: actionFunction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const user = await getAuthUser();
    if (!user) throw new Error('로그인이 필요합니다.');

    const existingProfile = await getAuthUserWithProfile();
    if (existingProfile) throw new Error('이미 프로필이 존재합니다.');

    const username = formData.get('username') as string;
    const imageFile = formData.get('profileImage') as File;

    const validatedUsername = validateWithSchema(Username, username);
    const existingUsername = await db.profile.findUnique({
      where: { username: validatedUsername },
    });
    if (existingUsername) throw new Error('이미 사용 중인 닉네임입니다.');

    let imagePath = '';
    if (imageFile && imageFile.size > 0) {
      validateWithSchema(ProfileImage, imageFile);
      imagePath = await uploadImage(imageFile);
    }

    await db.profile.create({
      data: {
        supabaseId: user.id,
        username: validatedUsername,
        email: user.email ?? null,
        provider: user.app_metadata.provider as string,
        profileImage: imagePath,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  revalidatePath('/', 'layout');
  redirect('/');
};

export const fetchProfileImage = async () => {
  const profile = await getAuthUserWithProfile();
  return profile?.profileImage ?? null;
};
