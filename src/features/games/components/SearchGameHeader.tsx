'use client';

import { useAppSelector } from '@/lib/store/hooks';
import React from 'react';
import StartSearchGameButton from './StartSearchGameButton';
import StopSearchGameButton from './StopSearchGameButton';
import SelectSearchGameMode from './SelectSearchGameMode';
import SearchGameChronometer from './SearchGameChronometer';

const SearchGameHeader = () => {
  const { mode, searchGame } = useAppSelector(
    (state) => state.searchGame
  );

  const isDisabled = !!searchGame;

  return (
    <div className="flex flex-row items-center justify-between">
      <SelectSearchGameMode
        selectedMode={mode}
        isDisabled={isDisabled}
      />

      {searchGame && (
        <SearchGameChronometer time={searchGame.createdAt} />
      )}

      {searchGame ? (
        <StopSearchGameButton />
      ) : (
        <StartSearchGameButton mode={mode} />
      )}
    </div>
  );
};

export default SearchGameHeader;
