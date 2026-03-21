import { createProfileAction } from '@/utils/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import ImageInput from '@/components/profile/ImageInput';

function ProfileSetupPage() {
  return (
    <section className='flex justify-center'>
      <div className='w-full max-w-sm rounded-xl border p-8'>
        <h1 className='text-2xl font-semibold'>프로필 생성</h1>
        <form action={createProfileAction} className='mt-6 space-y-6'>
          <ImageInput name='profileImage' />

          <div className='flex flex-col gap-3'>
            <FieldLabel htmlFor='username'>
              닉네임<span className='text-destructive'>*</span>
            </FieldLabel>
            <Field orientation='horizontal'>
              <Input
                id='username'
                name='username'
                type='text'
                placeholder='닉네임'
                required
              />
              <Button variant='outline'>중복 확인</Button>
            </Field>
          </div>

          <div className='flex justify-center'>
            <Button type='submit' size='lg'>
              생성하기
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProfileSetupPage;
