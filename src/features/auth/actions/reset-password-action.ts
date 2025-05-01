'use server';

import { getUserByEmail } from '@/data/user-data';
import {
  forgotPasswordSchema,
  forgotPasswordType,
} from '../schemas/forgot-password-schema';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/token';

export const resetPassword = async (data: forgotPasswordType) => {
  const validatedFields = forgotPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: 'Invalid form',
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: 'This email does not exist',
    };
  }

  const passwordToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(email, passwordToken.token);

  return {
    message: 'Email sent',
  };
};
