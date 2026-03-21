'use client';

import { useState } from 'react';
import { createProfileAction } from '@/utils/actions';
import ImageInput from './ImageInput';
import NicknameInput from './NicknameInput';
import { SubmitButton } from '../form/Buttons';

function ProfileSetupForm() {
  const [isAvailable, setIsAvailable] = useState(false);

  return (
    <form action={createProfileAction} className='mt-6 space-y-6'>
      <ImageInput name='profileImage' />
      <NicknameInput name='username' onAvailableChange={setIsAvailable} />
      <div className='flex justify-center'>
        <SubmitButton text='생성하기' disabled={!isAvailable} />
      </div>
    </form>
  );
}

export default ProfileSetupForm;
