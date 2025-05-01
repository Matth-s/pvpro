'use client';

import React from 'react';
import { redirectSteamAuth } from '../utils/redirect-to-steam-auth';
import { Button } from '@/components/ui/button';

const RedirectAuthSteamButton = () => {
  return (
    <Button onClick={redirectSteamAuth} className="cursor-pointer">
      Steam login
    </Button>
  );
};

export default RedirectAuthSteamButton;
