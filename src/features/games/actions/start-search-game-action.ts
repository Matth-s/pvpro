'use server';

import { getCurrentUserServerAction } from '@/helpers/user-helper';
import {
  startSearchGameSchema,
  startSearchGameType,
} from '../schemas/start-search-game-schema';
import { getSearchGameByUserId } from '@/data/search-game-data';
import { prisma } from '@/lib/prisma';
import { getSteamByUserId } from '@/data/steam-data';

export const startSearchGameAction = async (
  data: startSearchGameType
) => {
  const { id } = await getCurrentUserServerAction();

  const validatedFields = startSearchGameSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: 'Invalid form',
    };
  }

  const userHasSteamSync = await getSteamByUserId(id);

  if (!userHasSteamSync) {
    return {
      error: 'You have to connected your steam account',
    };
  }

  const { mode, maps } = validatedFields.data;

  const existingSearchGame = await getSearchGameByUserId(id);

  if (existingSearchGame) {
    return {
      data: existingSearchGame,
    };
  }

  try {
    const savedSearchGame = await prisma.searchGame.create({
      data: {
        userId: id,
        mode,
        maps,
      },
    });

    return {
      data: savedSearchGame,
    };
  } catch (err) {
    console.log(err);
    throw new Error('Internal server error');
  }
};
