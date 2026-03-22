import { toast, type ToasterProps } from 'sonner';

type ToastOptions = {
  position?: ToasterProps['position'];
};

function useToast(options: ToastOptions = {}) {
  const { position = 'bottom-right' } = options;

  const success = (message: string) => toast.success(message, { position });
  const error = (message: string) => toast.error(message, { position });

  const formAction = (state: { success: boolean | null; message: string }) => {
    if (!state.message) return;

    if (state.success) {
      success(state.message);
    } else {
      error(state.message);
    }
  };

  return { success, error, formAction };
}

export default useToast;
