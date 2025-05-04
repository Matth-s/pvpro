import { Player } from '@prisma/client';

export const formatElapsedTime = (time: number) => {
  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const checkIfUserHasJoinGame = (
  players: Player[],
  userId: string
): boolean => {
  const isJoinded =
    players.find((player) => player.userId === userId)?.status ===
    'joined';

  return !!isJoinded;
};

export const gameIsExpired = (date: Date): boolean => {
  const now = Date.now();
  const target = date.getTime();
  const THIRTY_SECONDS = 30 * 1000;
  return now - target > THIRTY_SECONDS;
};

export const checkIfAllUsersAreReady = (players: Player[]) => {
  return players.every((player) => player.status === 'joined');
};
