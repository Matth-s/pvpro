import { prisma } from '@/lib/prisma';

export const getSteamByUserId = async (userId: string) => {
  try {
    const existingSteam = await prisma.steam.findUnique({
      where: {
        userId,
      },
    });

    return existingSteam;
  } catch {
    throw new Error('An error has occured');
  }
};

export const getSteamById = async (id: string) => {
  try {
    const existingSteam = await prisma.steam.findFirst({
      where: {
        id,
      },
    });

    return existingSteam;
  } catch {
    throw new Error('Internal server error');
  }
};
