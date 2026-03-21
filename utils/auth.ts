import { createClient } from '@/lib/supabase/server';
import db from './db';

export async function getAuthUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getAuthUserWithProfile() {
  const user = await getAuthUser();
  if (!user) return null;

  return db.profile.findUnique({
    where: { supabaseId: user.id },
  });
}
