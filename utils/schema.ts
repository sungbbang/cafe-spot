import * as z from 'zod';

export const Username = z
  .string()
  .min(2, '2글자 이상 입력해주세요.')
  .max(8, '8글자 이하로 입력해주세요.');

export const validateWithSchema = <T extends z.ZodTypeAny>(
  zodSchema: T,
  data: unknown,
): z.infer<T> => {
  const result = zodSchema.safeParse(data);

  if (!result.success) {
    const errorMessage = result.error.issues[0].message;
    throw new Error(errorMessage);
  }

  return result.data;
};
