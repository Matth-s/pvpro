'use client';

import { formatRootMessageFormError } from '@/utils/format-form-root-error';
import React, { useState } from 'react';
import { startSearchGameAction } from '../actions/start-search-game-action';
import { useAppDispatch } from '@/lib/store/hooks';
import { setSearchGame } from '@/lib/store/features/search-game-slice';
import SubmitButton from '@/components/SubmitButton';
import { toast } from 'sonner';
import { GameMode } from '@prisma/client';

type StartSearchGameButton = {
  mode: GameMode;
};

const StartSearchGameButton = ({ mode }: StartSearchGameButton) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearchGame = async () => {
    try {
      const res = await startSearchGameAction({
        mode,
        maps: ['mirage'],
      });

      if (res?.error) return toast(res.error);
      if (res?.data) return dispatch(setSearchGame(res.data));
    } catch (err) {
      toast(formatRootMessageFormError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubmitButton
      action={() => handleSearchGame()}
      label="Search game"
      isDisabled={isLoading}
    />
  );
};
export default StartSearchGameButton;
