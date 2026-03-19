import { signIn } from '@/utils/actions';
import { Button } from '../ui/button';

type Provider = {
  name: 'google' | 'kakao';
  label: string;
  imgUrl: string;
  className?: string;
};

const providers: Provider[] = [
  {
    name: 'google',
    label: '구글로 계속하기',
    imgUrl: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png',
  },
  {
    name: 'kakao',
    label: '카카오로 계속하기',
    imgUrl: 'https://cdn-icons-png.flaticon.com/512/2111/2111466.png',
    className: 'border-yellow-300 bg-yellow-300 hover:bg-yellow-400',
  },
];

export default function SocialAuthButtons() {
  return (
    <div className='flex flex-col gap-3 p-4'>
      {providers.map(provider => (
        <form key={provider.name} action={signIn}>
          <input type='hidden' name='provider' value={provider.name} />

          <Button
            variant='outline'
            className={`flex h-11 w-full gap-2 ${provider.className}`}
            type='submit'
          >
            <img src={provider.imgUrl} alt={provider.name} className='size-5' />
            {provider.label}
          </Button>
        </form>
      ))}
    </div>
  );
}
