'use client';

import { createProfileAction } from '@/utils/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import UserIcon from '@/components/navbar/UserIcon';
import { useEffect, useState } from 'react';

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
        <h1 className='mb-6 text-2xl font-semibold'>프로필 생성</h1>

        <form action={createProfileAction} className='space-y-6'>
          <div className='flex flex-col items-center gap-3'>
            {preview ? (
              <img
                src={preview}
                className='h-16 w-16 rounded-full object-cover'
              />
            ) : (
              <UserIcon className='h-16 w-16' />
            )}
          </div>

          <div>
            <Field className='flex flex-col items-center gap-3'>
              <FieldLabel htmlFor='picture'>프로필 이미지</FieldLabel>
              <Input
                id='picture'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
              <FieldDescription>나중에 설정해도 상관없어요.</FieldDescription>
            </Field>
          </div>

          <div className='flex flex-col gap-3'>
            <FieldLabel htmlFor='username'>
              닉네임<span className='text-destructive'>*</span>
            </FieldLabel>
            <Field orientation='horizontal'>
              <Input
                id='username'
                name='username'
                type='text'
                placeholder='닉네임을 입력하세요.'
                required
              />
              <Button variant='outline'>중복 확인</Button>
            </Field>
          </div>

          <Button>시작하기</Button>
        </form>
      </div>
    </section>
  );
}

export default ProfileSetupPage;
