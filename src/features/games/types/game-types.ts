import { Game, Player, PLayerStatus } from '@prisma/client';

export interface GameInterface extends Game {
  players: Player[];
}

export interface GameWithUsernameAndPoint extends Game {
  players: PlayerWithUsernameAndPoint[];
}

export interface PlayerWithUsernameAndPoint {
  gameId: string;
  id: string;
  status: PLayerStatus;
  userId: string;
  team: string;
  user: {
    username: string;
    points: number;
  };
}
