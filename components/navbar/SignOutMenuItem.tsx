'use client';

import { DropdownMenuItem } from '../ui/dropdown-menu';
import { signOut } from '@/utils/actions';
import { useRouter } from 'next/navigation';
import useToast from '@/hooks/useToast';

function SignOutMenuItem() {
  const router = useRouter();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('로그아웃되었습니다.');
      router.push('/');
    } catch {
      toast.error('로그아웃에 실패했습니다.');
    }
  };

  return (
    <DropdownMenuItem onClick={handleLogout} className='w-full'>
      로그아웃
    </DropdownMenuItem>
  );
}

export default SignOutMenuItem;
