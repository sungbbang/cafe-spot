import { getAuthUserWithProfile } from '@/utils/auth';
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LuShieldAlert } from 'react-icons/lu';
import ProfileUpdateForm from '@/components/profile/ProfileUpdateForm';

async function ProfilePage() {
  const profile = await getAuthUserWithProfile();
  if (!profile) redirect('/profile/setup');

  const provider = profile.provider as 'google' | 'kakao';
  const joinedAt = new Date(profile.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const updatedAt = new Date(profile.updatedAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className='flex justify-center'>
      <div className='w-full max-w-sm space-y-4'>
        {/* 계정 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>계정 정보</CardTitle>
            <CardDescription>
              소셜 로그인으로 연결된 계정 정보예요.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>로그인 방식</span>
              <span className='font-medium'>
                {provider === 'google' ? '구글' : '카카오'}
              </span>
            </div>
            <Separator />
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>이메일</span>
              <span className='font-medium'>{profile.email}</span>
            </div>
            <Separator />
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>가입일</span>
              <span className='font-medium'>{joinedAt}</span>
            </div>
            <Separator />
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>최근 수정일</span>
              <span className='font-medium'>{updatedAt}</span>
            </div>
          </CardContent>
        </Card>

        {/* 프로필 수정 폼 */}
        <Card>
          <CardHeader>
            <CardTitle>프로필 수정</CardTitle>
            <CardDescription>
              프로필 이미지와 닉네임을 수정하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileUpdateForm
              username={profile.username}
              profileImage={profile.profileImage}
            />
          </CardContent>
        </Card>

        {/* 회원탈퇴 */}
        <Card className='border-destructive/40'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <LuShieldAlert className='text-destructive h-5 w-5' />
              <CardTitle>회원탈퇴</CardTitle>
            </div>
            <CardDescription>
              탈퇴 시 모든 정보가 삭제되며 복구할 수 없어요.
            </CardDescription>
          </CardHeader>
          <CardContent className='mt-4'>
            <Button variant='destructive' className='w-full'>
              탈퇴하기
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default ProfilePage;
