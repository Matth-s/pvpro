'use server';

import { GameInterface } from '@/features/games/types/game-types';
import { prisma } from '@/lib/prisma';

export const getGameAndPlayersByUserId = async (
  userId: string
): Promise<GameInterface | null> => {
  try {
    const existingGame = await prisma.game.findFirst({
      where: {
        players: {
          some: {
            userId,
          },
        },
      },
      include: {
        players: true,
      },
    });

    return existingGame;
  } catch {
    return null;
  }
};

export const getGameWithPlayersById = async (gameId: string) => {
  try {
    const existingGame = await prisma.game.findFirst({
      where: {
        id: gameId,
      },
      include: {
        players: {
          include: {
            user: {
              select: {
                username: true,
                points: true,
              },
            },
          },
        },
      },
    });

    return existingGame;
  } catch {
    throw new Error('Internal server error');
  }
};
