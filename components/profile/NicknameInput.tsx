'use client';

import { checkNickname } from '@/utils/actions';
import { Button } from '../ui/button';
import { Field, FieldDescription, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { useState } from 'react';

function NicknameInput({
  name,
  onAvailableChange,
}: {
  name: string;
  onAvailableChange: (available: boolean) => void;
}) {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);

  const handleCheckNickname = async () => {
    const result = await checkNickname(username);
    if (!result) return;

    setMessage(result.message);
    setIsAvailable(result.available);
    onAvailableChange(result.available);
  };

  return (
    <div className='flex flex-col gap-3'>
      <FieldLabel htmlFor={name}>
        닉네임<span className='text-destructive'>*</span>
      </FieldLabel>

      <Field orientation='horizontal'>
        <Input
          id={name}
          name={name}
          type='text'
          placeholder='닉네임'
          required
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            setMessage('');
            setIsAvailable(false);
            onAvailableChange(false);
          }}
        />
        <Button
          type='button'
          variant='outline'
          onClick={handleCheckNickname}
          disabled={!username}
        >
          중복 확인
        </Button>
      </Field>

      {message && (
        <FieldDescription
          className={`${isAvailable ? 'text-green-600' : 'text-destructive'}`}
        >
          {message}
        </FieldDescription>
      )}
    </div>
  );
}

export default NicknameInput;
