import { createClient } from '@supabase/supabase-js';

const bucket = 'cafe-spot';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export const adminAuthClient = supabaseAdmin.auth.admin;

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;

  const { data } = await supabase.storage.from(bucket).upload(newName, image, {
    cacheControl: '3600',
  });

  if (!data) throw new Error('이미지 업로드에 실패했습니다.');

  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
