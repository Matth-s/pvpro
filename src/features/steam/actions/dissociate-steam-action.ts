'use server';

import { getCurrentUserServerAction } from '@/helpers/user-helper';
import {
  dissociateSteamSchema,
  dissociateSteamType,
} from '../schemas/dissocate-steam-schema';
import { getSteamById } from '@/data/steam-data';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const dissociateSteamAction = async (
  data: dissociateSteamType
): Promise<
  | {
      error: string;
      success?: undefined;
    }
  | {
      success: string;
      error?: undefined;
    }
  | undefined
> => {
  await getCurrentUserServerAction();

  const validatedFields = dissociateSteamSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: 'Invalid form',
    };
  }

  const { steamId } = validatedFields.data;

  const existingSteamAccount = await getSteamById(steamId);

  if (!existingSteamAccount) {
    return {
      success: 'Steam has been dissociated',
    };
  }

  try {
    await prisma.steam.delete({
      where: {
        id: steamId,
      },
    });
  } catch {
    throw new Error('Internal server error');
  }

  revalidatePath('/', 'layout');
};
