import { z } from 'zod';

const passwordRegex =
  /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const resetPasswordSchema = z
  .object({
    token: z.string().trim().min(1, {
      message: 'Missing token',
    }),
    password: z
      .string()
      .min(8, {
        message: 'Password must contain at least 8 characters',
      })
      .regex(passwordRegex, {
        message:
          'Password must contain at least one number and one special character',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
