'use server';

import { getSearchGameByUserId } from '@/data/search-game-data';
import { getCurrentUserServerAction } from '@/helpers/user-helper';
import { prisma } from '@/lib/prisma';

export const stopSearchGameAction = async () => {
  const { id } = await getCurrentUserServerAction();

  const existingSearchGame = await getSearchGameByUserId(id);

  if (!existingSearchGame) return;

  try {
    await prisma.searchGame.delete({
      where: {
        userId: id,
      },
    });
  } catch {
    throw new Error('Internal server error');
  }
};
