import { configureStore } from '@reduxjs/toolkit';
import { searchGameSlice } from './features/search-game-slice';
import { gameSlice } from './features/game-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      searchGame: searchGameSlice.reducer,
      game: gameSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
