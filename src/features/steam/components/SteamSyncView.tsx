import React from 'react';
import DissociateSteamButton from './DissociateSteamButton';

type SteamSyncViewProps = {
  steamId: string;
};

const SteamSyncView = ({ steamId }: SteamSyncViewProps) => {
  return (
    <div>
      <ul>
        <li>
          Steam: <DissociateSteamButton steamId={steamId} />
        </li>
      </ul>
    </div>
  );
};

export default SteamSyncView;
