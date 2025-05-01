'use server';

import { getRestPasswordResetTokenByToken } from '@/data/password-reset-token';
import {
  resetPasswordSchema,
  resetPasswordType,
} from '../schemas/reset-password-schema';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/bcrypt';
import { getUserByEmail } from '@/data/user-data';

export const newPassword = async (data: resetPasswordType) => {
  const validatedFields = resetPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    throw new Error('Formulaire invalide');
  }

  const { token, password } = validatedFields.data;

  const existingToken = await getRestPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error: 'Invalid token',
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: 'Token has expired',
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: 'Invalid email',
    };
  }

  const hashedPassword = await hashPassword(password);

  try {
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      message: 'The password has been changed successfully',
    };
  } catch {
    throw new Error('An error has occured');
  }
};
