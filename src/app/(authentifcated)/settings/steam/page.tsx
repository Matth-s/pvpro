import { getSteamByUserId } from '@/data/steam-data';
import RedirectAuthSteamButton from '@/features/steam/components/RedirectAuthSteamButton';
import SteamSyncView from '@/features/steam/components/SteamSyncView';
import { getCurrentUser } from '@/helpers/user-helper';
import React from 'react';

const SteamPage = async () => {
  const { id } = await getCurrentUser();

  const isSteamSync = await getSteamByUserId(id);

  if (isSteamSync) return <SteamSyncView steamId={isSteamSync.id} />;

  return (
    <div>
      <RedirectAuthSteamButton />
    </div>
  );
};

export default SteamPage;
