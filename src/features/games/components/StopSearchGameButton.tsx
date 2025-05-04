'use client';

import SubmitButton from '@/components/SubmitButton';
import React, { useState } from 'react';
import { stopSearchGameAction } from '../actions/stop-search-game-action';
import { useAppDispatch } from '@/lib/store/hooks';
import { setSearchGame } from '@/lib/store/features/search-game-slice';
import { formatRootMessageFormError } from '@/utils/format-form-root-error';
import { toast } from 'sonner';

const StopSearchGameButton = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStop = async () => {
    try {
      await stopSearchGameAction();
      dispatch(setSearchGame(null));
    } catch (err) {
      toast(formatRootMessageFormError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubmitButton
      label="Stop"
      isDisabled={isLoading}
      action={() => handleStop()}
    />
  );
};

export default StopSearchGameButton;
