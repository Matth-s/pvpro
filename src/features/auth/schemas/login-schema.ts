import { z } from 'zod';

export const loginSchema = z.object({
  usernameOrEmail: z.string().nonempty({
    message: 'Required field',
  }),
  password: z.string().nonempty({
    message: 'Password required',
  }),
  code: z.optional(z.string()),
});

export type loginType = z.infer<typeof loginSchema>;
