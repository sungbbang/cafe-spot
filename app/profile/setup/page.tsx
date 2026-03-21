import { getAuthUserWithProfile } from '@/utils/auth';
import { redirect } from 'next/navigation';
import ProfileSetupForm from '@/components/profile/ProfileSetupForm';

async function ProfileSetupPage() {
  const profile = await getAuthUserWithProfile();
  if (profile) redirect('/');

  return (
    <section className='flex justify-center'>
      <div className='w-full max-w-sm rounded-xl border p-8'>
        <h1 className='text-2xl font-semibold'>프로필 생성</h1>
        <ProfileSetupForm />
      </div>
    </section>
  );
}

export default ProfileSetupPage;
