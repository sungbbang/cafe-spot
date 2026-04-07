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

function validateFile(maxSize = 1024 * 1024) {
  return z
    .instanceof(File)
    .refine(
      file => !file || file.size <= maxSize,
      `파일 크기는 ${maxSize / (1024 * 1024)}MB 이하여야 합니다.`,
    )
    .refine(
      file => !file || file.type.startsWith('image/'),
      '이미지 파일만 업로드 가능합니다.',
    );
}

export const ProfileImage = validateFile();
export const CafeImage = validateFile(3 * 1024 * 1024);

export const Cafe = z.object({
  name: z
    .string()
    .min(2, { message: '상호명은 2글자 이상이어야 합니다.' })
    .max(20, { message: '상호명은 20글자 이하이어야 합니다.' }),

  address: z.string().min(5, { message: '주소를 정확히 입력해주세요.' }),

  description: z
    .string()
    .min(8, { message: '소개는 8글자 이상이어야 합니다.' })
    .max(20, { message: '소개는 20글자 이하이어야 합니다.' }),

  category: z.string().min(1, { message: '카테고리를 선택해주세요.' }),

  amenities: z.string(),
});
