import PageContainer from '@/components/PageContainer';
import { getSteamByUserId } from '@/data/steam-data';
import NotConnectedSteamCard from '@/features/games/components/NotConnectedSteamCard';
import SearchGameHeader from '@/features/games/components/SearchGameHeader';
import { getCurrentUser } from '@/helpers/user-helper';
import React from 'react';

const HomePage = async () => {
  const { id } = await getCurrentUser();

  const isSteamConnected = await getSteamByUserId(id);

  return (
    <PageContainer className="flex h-full px-6">
      {isSteamConnected ? (
        <div className="w-full">
          <SearchGameHeader />
        </div>
      ) : (
        <NotConnectedSteamCard />
      )}
    </PageContainer>
  );
};

export default HomePage;
