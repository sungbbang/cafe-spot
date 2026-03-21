'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

type btnSize = 'default' | 'xs' | 'sm' | 'lg';

type SubmitButtonProps = {
  text: string;
  variant?: 'default' | 'outline';
  className?: string;
  size?: btnSize;
  disabled?: boolean;
};

export function SubmitButton({
  text,
  size = 'lg',
  variant = 'default',
  className = '',
  disabled = false,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      size={size}
      variant={variant}
      className={className}
      disabled={pending || disabled}
    >
      {pending ? (
        <>
          <Spinner data-icon='inline-start' />
          로딩 중...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
