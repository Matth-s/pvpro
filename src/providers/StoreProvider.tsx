'use client';

import { GameInterface } from '@/features/games/types/game-types';
import { setGame } from '@/lib/store/features/game-slice';
import { setSearchGame } from '@/lib/store/features/search-game-slice';
import { AppStore, makeStore } from '@/lib/store/store';
import { SearchGame } from '@prisma/client';
import { useRef } from 'react';
import { Provider } from 'react-redux';

type StoreProviderProps = {
  children: React.ReactNode;
  searchGame: SearchGame | null;
  game: GameInterface | null;
};

export default function StoreProvider({
  searchGame,
  game,
  children,
}: StoreProviderProps) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setSearchGame(searchGame));
    storeRef.current.dispatch(setGame(game));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
