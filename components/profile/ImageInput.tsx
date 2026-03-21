'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import UserIcon from '../navbar/UserIcon';
import { Field, FieldDescription, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

function ImageInput({ name }: { name: string }) {
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
          <FieldLabel htmlFor={name}>프로필 이미지</FieldLabel>
          <Input
            id={name}
            name={name}
            type='file'
            accept='image/*'
            onChange={handleImageChange}
          />
          <FieldDescription>나중에 설정할 수 있어요.</FieldDescription>
        </Field>
      </>
    </>
  );
}

export default ImageInput;
