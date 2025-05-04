'use client';

import React, { useState } from 'react';

import SubmitButton from '@/components/SubmitButton';
import { toast } from 'sonner';
import { formatRootMessageFormError } from '@/utils/format-form-root-error';
import { joinGameAction } from '../actions/join-game-action';

type JoinGameButtonProps = {
  gameId: string;
  userId: string;
};

const JoinGameButton = ({ gameId, userId }: JoinGameButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleJoinGame = async () => {
    setIsLoading(true);

    try {
      const res = await joinGameAction({ gameId, userId });

      if (res?.error) return toast(res.error);
    } catch (err) {
      toast(formatRootMessageFormError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubmitButton
      isDisabled={isLoading}
      label="Join"
      action={() => handleJoinGame()}
    />
  );
};

export default JoinGameButton;
