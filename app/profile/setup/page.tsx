'use client';

import { createProfileAction } from '@/utils/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import UserIcon from '@/components/navbar/UserIcon';
import { useEffect, useState } from 'react';
import Image from 'next/image';

function ProfileSetupPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // 이전 객체 URL을 해제해 메모리 정리
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    // 파일 선택 취소 시 미리보기도 기본값으로 수정
    if (!file) {
      setPreview(null);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <section className='flex justify-center'>
      <div className='w-full max-w-sm rounded-xl border p-8'>
        <h1 className='text-2xl font-semibold'>프로필 생성</h1>
        <form action={createProfileAction} className='mt-6 space-y-6'>
          <div className='flex flex-col items-center gap-3'>
            {preview ? (
              <Image
                src={preview}
                width={96}
                height={96}
                className='h-24 w-24 rounded-md object-cover'
                alt='profileImage'
              />
            ) : (
              <UserIcon className='h-24 w-24 rounded-md' />
            )}
          </div>

          <>
            <Field className='flex flex-col items-center gap-3'>
              <FieldLabel htmlFor='profileImage'>프로필 이미지</FieldLabel>
              <Input
                id='profileImage'
                name='profileImage'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
              <FieldDescription>나중에 설정할 수 있어요.</FieldDescription>
            </Field>
          </>

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
