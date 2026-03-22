export type actionFunction = (
  prevState: any,
  formData: FormData,
) => Promise<{ success: boolean | null; message: string }>;
