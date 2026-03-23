'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import UserIcon from '../navbar/UserIcon';
import { Field, FieldDescription, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { ProfileImage, validateWithSchema } from '@/utils/schema';

function ImageInput({ name }: { name: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (preview) URL.revokeObjectURL(preview);

    if (!file) {
      setPreview(null);
      setError(null);
      return;
    }

    try {
      validateWithSchema(ProfileImage, file);
    } catch (error) {
      e.target.value = '';
      setError(error instanceof Error ? error.message : '오류가 발생했습니다.');
      setPreview(null);
      return;
    }

    setPreview(URL.createObjectURL(file));
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <>
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
          <FieldDescription>나중에 설정할 수 있어요.</FieldDescription>
          <FieldLabel htmlFor={name}>프로필 이미지</FieldLabel>
          <Input
            id={name}
            name={name}
            type='file'
            accept='image/*'
            onChange={handleImageChange}
          />
          {error && (
            <FieldDescription className='text-destructive'>
              {error}
            </FieldDescription>
          )}
        </Field>
      </>
    </>
  );
}

export default ImageInput;
