import { GameInterface } from '@/features/games/types/game-types';
import { Player } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState {
  game: GameInterface | null;
  showAccessLink: boolean;
}

const initialState: initialState = {
  game: null,
  showAccessLink: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<GameInterface | null>) => {
      state.game = action.payload;
    },
    setUpdateGamePlayer: (state, action: PayloadAction<Player>) => {
      const updatedPlayer = action.payload;

      if (!state.game) return;

      const updatedPlayers = state.game.players.map((player) => {
        if (player.userId === updatedPlayer.userId) {
          return updatedPlayer;
        }

        return player;
      });

      state.game = {
        ...state.game,
        players: updatedPlayers,
      };
    },
    setShowAccessLink: (state, action: PayloadAction<boolean>) => {
      state.showAccessLink = action.payload;
    },
  },
});

export const { setGame, setUpdateGamePlayer, setShowAccessLink } =
  gameSlice.actions;
export default gameSlice.reducer;
