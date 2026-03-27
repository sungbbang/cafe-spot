'use client';

import { checkNickname } from '@/utils/actions';
import { Button } from '../ui/button';
import { Field, FieldDescription, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { useState } from 'react';

type NicknameInputProps = {
  name: string;
  defaultValue?: string | null;
  onAvailableChange?: (available: boolean) => void;
};

function NicknameInput({
  name,
  defaultValue,
  onAvailableChange,
}: NicknameInputProps) {
  const [username, setUsername] = useState(defaultValue || '');
  const [message, setMessage] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(false);

  const handleCheckNickname = async () => {
    const result = await checkNickname(username);
    if (!result) return;

    setMessage(result.message);
    setIsValidNickname(result.available);
    onAvailableChange?.(result.available);
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
            setIsValidNickname(false);
            onAvailableChange?.(false);
          }}
        />
        <Button
          type='button'
          variant='outline'
          onClick={handleCheckNickname}
          disabled={username === '' || username === defaultValue}
        >
          중복 확인
        </Button>
      </Field>

      {message && (
        <FieldDescription
          className={`${isValidNickname ? 'text-green-600' : 'text-destructive'}`}
        >
          {message}
        </FieldDescription>
      )}
    </div>
  );
}

export default NicknameInput;
