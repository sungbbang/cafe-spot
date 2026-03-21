'use client';

import { useState } from 'react';
import { createProfileAction } from '@/utils/actions';
import ImageInput from './ImageInput';
import NicknameInput from './NicknameInput';
import { Button } from '../ui/button';

function ProfileSetupForm() {
  const [isAvailable, setIsAvailable] = useState(false);

  return (
    <form action={createProfileAction} className='mt-6 space-y-6'>
      <ImageInput name='profileImage' />
      <NicknameInput name='username' onAvailableChange={setIsAvailable} />
      <div className='flex justify-center'>
        <Button type='submit' size='lg' disabled={!isAvailable}>
          생성하기
        </Button>
      </div>
    </form>
  );
}

export default ProfileSetupForm;
