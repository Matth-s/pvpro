import { getSteamByUserId } from '@/data/steam-data';
import AttachSteamCallback from '@/features/steam/components/AttachSteamCallback';
import SteamAlreadySync from '@/features/steam/components/SteamAlreadySync';
import { getCurrentUser } from '@/helpers/user-helper';
import React from 'react';

type SteamCallbackPageProps = {
  searchParams: Promise<Record<string, string>>;
};

const SteamCallbackPage = async ({
  searchParams,
}: SteamCallbackPageProps) => {
  const { id } = await getCurrentUser();

  const params = await searchParams;
  const steamIsAlreadyAssociated = await getSteamByUserId(id);

  if (steamIsAlreadyAssociated) return <SteamAlreadySync />;

  return (
    <div>
      <AttachSteamCallback params={params} />
    </div>
  );
};

export default SteamCallbackPage;
