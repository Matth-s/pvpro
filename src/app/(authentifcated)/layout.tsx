import React from 'react';
import Header from './_components/Header';
import StoreProvider from '@/providers/StoreProvider';
import { getCurrentUser } from '@/helpers/user-helper';
import { getSearchGameByUserId } from '@/data/search-game-data';
import GameProvider from '@/providers/GameProvider';
import { getGameAndPlayersByUserId } from '@/data/game-data';

type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout = async ({ children }: HomeLayoutProps) => {
  const { id } = await getCurrentUser();

  const searchGame = await getSearchGameByUserId(id);
  const game = await getGameAndPlayersByUserId(id);

  return (
    <StoreProvider searchGame={searchGame} game={game}>
      <GameProvider userId={id}>
        <div className="flex flex-col h-full">
          <Header />
          {children}
        </div>
      </GameProvider>
    </StoreProvider>
  );
};

export default HomeLayout;
