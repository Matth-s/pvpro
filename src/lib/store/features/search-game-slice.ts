import { GameMode, SearchGame } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState {
  searchGame: SearchGame | null;
  mode: GameMode;
  maps: string[];
}

const initialState: initialState = {
  searchGame: null,
  mode: 'p_1v1',
  maps: ['mirage'],
};

export const searchGameSlice = createSlice({
  name: 'searchGame',
  initialState,
  reducers: {
    setSearchGame: (
      state,
      action: PayloadAction<SearchGame | null>
    ) => {
      state.searchGame = action.payload;
    },
    setMode: (state, action: PayloadAction<GameMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setSearchGame, setMode } = searchGameSlice.actions;
export default searchGameSlice.reducer;
