import { prisma } from '@/lib/prisma';

export const getSearchGameByUserId = async (userId: string) => {
  try {
    const existingSearchGame = await prisma.searchGame.findUnique({
      where: {
        userId,
      },
    });

    return existingSearchGame;
  } catch {
    return null;
  }
};
