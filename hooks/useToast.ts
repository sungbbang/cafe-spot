import { toast, type ToasterProps } from 'sonner';

type ToastOptions = {
  position?: ToasterProps['position'];
};

function useToast(options: ToastOptions = {}) {
  const { position = 'bottom-right' } = options;

  const success = (message: string) => toast.success(message, { position });
  const error = (message: string) => toast.error(message, { position });

  return { success, error };
}

export default useToast;
