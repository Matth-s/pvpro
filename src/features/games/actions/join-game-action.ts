'use server';

import { getCurrentUserServerAction } from '@/helpers/user-helper';
import {
  joinGameSchema,
  joinGameType,
} from '../schemas/join-game-schema';
import { getGameWithPlayersById } from '@/data/game-data';
import { gameIsExpired } from '../utils/game-utils';
import { prisma } from '@/lib/prisma';

export const joinGameAction = async (data: joinGameType) => {
  const { id } = await getCurrentUserServerAction();

  const validatedFields = joinGameSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: 'Invalid form',
    };
  }

  const { gameId } = validatedFields.data;

  const existingGame = await getGameWithPlayersById(gameId);

  if (!existingGame) {
    return {
      error: 'Game not found',
    };
  }

  const isExpired = gameIsExpired(existingGame.createdAt);

  if (isExpired) {
    return {
      error: 'Game has expired',
    };
  }

  const userIsOnPlayer = existingGame.players.find(
    (player) => player.userId === id
  );

  if (!userIsOnPlayer) {
    return {
      error: "You're not allowed to join this game",
    };
  }

  if (userIsOnPlayer.status === 'joined') return;

  try {
    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        players: {
          update: {
            where: {
              userId: id,
            },
            data: {
              status: 'joined',
            },
          },
        },
      },
    });
  } catch {
    throw new Error('Internal server error');
  }
};
