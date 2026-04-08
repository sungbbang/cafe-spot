import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCafeAction } from '@/utils/actions';

function RegisterCafePage() {
  return (
    <section className='mx-auto max-w-2xl py-10'>
      <h1 className='mb-8 text-2xl font-semibold'>카페 등록</h1>

      <FormContainer action={createCafeAction} className='space-y-10'>
        {/* 기본 정보 */}
        <div className='mt-4 grid gap-4 md:grid-cols-2'>
          <FormInput
            label='상호명'
            name='name'
            placeholder='카페 이름을 입력해주세요'
            required
          />

          <FormInput
            label='소개'
            name='description'
            placeholder='카페를 소개해주세요'
            required
          />

          <div className='space-y-2'>
            <Label htmlFor='address'>
              주소
              <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='address'
              name='address'
              type='text'
              placeholder='주소를 입력해주세요'
              required
            />
          </div>
        </div>

        {/* 카테고리 */}

        {/* 편의시설 */}

        {/* 이미지 */}

        <SubmitButton text='등록하기' />
      </FormContainer>
    </section>
  );
}

export default RegisterCafePage;
