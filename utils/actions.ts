'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

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

export const createProfileAction = async () => {
  redirect('/');
};
