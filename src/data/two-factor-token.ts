import { prisma } from '@/lib/prisma';

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const existingToken = await prisma.twoFactorToken.findFirst({
      where: {
        email,
      },
    });

    return existingToken;
  } catch {
    return null;
  }
};
