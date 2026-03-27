'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import UserIcon from '../navbar/UserIcon';
import { Field, FieldDescription, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ProfileImage, validateWithSchema } from '@/utils/schema';

type ImageInputProps = {
  name: string;
  defaultValue?: string | null;
  onRemove?: () => void;
  onFileChange?: () => void;
  showDescription?: boolean;
};

function ImageInput({
  name,
  defaultValue,
  onRemove,
  onFileChange,
  showDescription = false,
}: ImageInputProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const [error, setError] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // blob URL만 해제 (defaultValue는 외부 URL이라 해제 불필요)
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }

    if (!file) {
      setPreview(defaultValue || null);
      setError(null);
      return;
    }

    try {
      validateWithSchema(ProfileImage, file);
    } catch (error) {
      e.target.value = '';
      setError(error instanceof Error ? error.message : '오류가 발생했습니다.');
      setPreview(defaultValue ?? null);
      return;
    }

    setPreview(URL.createObjectURL(file));
    setError(null);
    onFileChange?.();
  };

  const handleRemove = () => {
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }

    setPreview(null);
    onRemove?.();
  };

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
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
        {onRemove && preview && (
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={handleRemove}
          >
            기본 이미지로 변경
          </Button>
        )}
      </div>

      <Field className='flex flex-col items-center gap-3'>
        {showDescription && (
          <FieldDescription>나중에 설정할 수 있어요.</FieldDescription>
        )}
        <FieldLabel htmlFor={name}>프로필 이미지</FieldLabel>
        <Input
          id={name}
          name={name}
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={imageInputRef}
        />
        {error && (
          <FieldDescription className='text-destructive'>
            {error}
          </FieldDescription>
        )}
      </Field>
    </>
  );
}

export default ImageInput;
