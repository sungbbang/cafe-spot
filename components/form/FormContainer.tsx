'use client';

import useToast from '@/hooks/useToast';
import { actionFunction } from '@/utils/types';
import { useActionState, useEffect } from 'react';

const initialState = {
  success: null,
  message: '',
};

type FormContainerProps = {
  action: actionFunction;
  children: React.ReactNode;
  className?: string;
};

function FormContainer({
  action,
  children,
  className = '',
}: FormContainerProps) {
  const [state, formAction] = useActionState(action, initialState);
  const toast = useToast();

  useEffect(() => {
    toast.formAction(state);
  }, [state]);

  return (
    <form action={formAction} className={className}>
      {children}
    </form>
  );
}

export default FormContainer;
