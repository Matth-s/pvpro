import { z } from 'zod';

const passwordRegex =
  /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, {
        message: 'Username should have length of 4',
      })
      .max(20, {
        message: 'Username should have length of 20',
      })
      .regex(/^\S+$/, 'No spaces allowed in username'),
    email: z.string().email({ message: 'Invalid email' }),
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

export type signupType = z.infer<typeof signupSchema>;
