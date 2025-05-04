'use client';

import React from 'react';
import { ButtonAction } from './ButtonAction';

const ButtonRcon = ({ gameId }: { gameId: string }) => {
  return (
    <button
      onClick={async () => {
        await ButtonAction(gameId);
      }}
    >
      créer le serveur
    </button>
  );
};

export default ButtonRcon;
