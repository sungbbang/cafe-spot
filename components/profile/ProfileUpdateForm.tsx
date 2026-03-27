'use client';

import { useState } from 'react';
import { updateProfileAction } from '@/utils/actions';
import ImageInput from './ImageInput';
import NicknameInput from './NicknameInput';
import { SubmitButton } from '../form/Buttons';
import FormContainer from '../form/FormContainer';

function ProfileUpdateForm({
  username,
  profileImage,
}: {
  username: string;
  profileImage: string | null;
}) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [removeImage, setRemoveImage] = useState(false);

  return (
    <FormContainer action={updateProfileAction} className='mt-6 space-y-6'>
      {/* 기본 이미지로 변경할 시에 폼 데이터에 전달될 input을 hidden 처리 */}
      <input type='hidden' name='removeImage' value={String(removeImage)} />
      <ImageInput
        name='profileImage'
        defaultValue={profileImage}
        onRemove={() => setRemoveImage(true)}
        onFileChange={() => setRemoveImage(false)}
      />
      <NicknameInput
        name='username'
        defaultValue={username}
        onAvailableChange={setIsAvailable}
      />
      <div className='flex justify-center'>
        <SubmitButton text='수정하기' />
      </div>
    </FormContainer>
  );
}

export default ProfileUpdateForm;
