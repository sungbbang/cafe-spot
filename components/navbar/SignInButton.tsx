import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SocialAuthButtons from './SocialAuthButtons';

function SignInButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='h-9 px-4'>
          로그인
        </Button>
      </DialogTrigger>
      <DialogContent className='p-8 sm:max-w-xs'>
        <DialogHeader className='items-center space-y-2 text-center'>
          <DialogTitle className='text-xl font-semibold tracking-wide'>
            카페스팟
          </DialogTitle>

          <DialogDescription>
            로그인하고 서비스를 이용해보세요.
          </DialogDescription>
        </DialogHeader>

        <div className='mt-4 flex items-center gap-2 px-4'>
          <div className='bg-muted h-px flex-1' />
          <span className='text-muted-foreground text-xs'>간편 로그인</span>
          <div className='bg-muted h-px flex-1' />
        </div>

        <SocialAuthButtons />
      </DialogContent>
    </Dialog>
  );
}

export default SignInButton;
