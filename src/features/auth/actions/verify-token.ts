'use server';

import { getUserByEmail } from '@/data/user-data';
import { getVerificationTokenByToken } from '@/data/verification-token';
import { prisma } from '@/lib/prisma';

export const verifyToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: 'The token does not exist',
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: 'Expired token',
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: 'This email does not exist',
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  } catch {
    throw new Error('An error has occured');
  }
};
