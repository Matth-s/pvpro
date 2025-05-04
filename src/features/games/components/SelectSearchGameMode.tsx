'use client';

import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GameMode } from '@prisma/client';
import { useAppDispatch } from '@/lib/store/hooks';
import { setMode } from '@/lib/store/features/search-game-slice';

const modes = [
  {
    mode: 'p_1v1',
    name: '1 vs 1',
  },
  {
    mode: 'p_2v2',
    name: '2 vs 2',
  },
  {
    mode: 'p_3v3',
    name: '3 vs 3',
  },
  {
    mode: 'p_5v5',
    name: '5 vs 5',
  },
];

type SelectSearchGameModeProps = {
  selectedMode: GameMode;
  isDisabled: boolean;
};

const SelectSearchGameMode = ({
  selectedMode,
  isDisabled,
}: SelectSearchGameModeProps) => {
  const dispatch = useAppDispatch();

  const handleModeChange = (mode: GameMode) => {
    dispatch(setMode(mode));
  };

  return (
    <div className="flex items-center w-fit font-bold">
      <p className="font-bold mr-1">Select game mode : </p>

      <Select
        disabled={isDisabled}
        value={selectedMode}
        defaultValue={selectedMode}
        onValueChange={(e) => handleModeChange(e as GameMode)}
      >
        <SelectTrigger className="w-auto bg-white">
          <SelectValue
            placeholder="mode"
            className="cursor-pointer"
          />
        </SelectTrigger>
        <SelectContent>
          {modes.map((mode) => (
            <SelectItem
              className="cursor-pointer"
              key={mode.mode}
              value={mode.mode}
            >
              {mode.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSearchGameMode;
