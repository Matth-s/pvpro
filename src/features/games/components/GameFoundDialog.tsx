'use client';

import React from 'react';
import { GameInterface } from '../types/game-types';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import FoundGamePlayerCard from './FoundGamePlayerCard';
import { checkIfUserHasJoinGame } from '../utils/game-utils';
import JoinGameButton from './JoinGameButton';
import Link from 'next/link';

type GameFoundDialogProps = {
  game: GameInterface | null;
  userId: string;
  showAccessLink: boolean;
};

const GameFoundDialog = ({
  game,
  userId,
  showAccessLink,
}: GameFoundDialogProps) => {
  if (!game) return null;

  const { players } = game;

  const userHasJoinGame = checkIfUserHasJoinGame(players, userId);

  return (
    <Dialog open={!!game}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game found !</DialogTitle>
        </DialogHeader>

        <div>
          <FoundGamePlayerCard players={players} />

          {!userHasJoinGame && (
            <DialogFooter>
              <JoinGameButton gameId={game.id} userId={userId} />
            </DialogFooter>
          )}

          {showAccessLink && (
            <Link href={`/match/${game.id}`}>Match room</Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameFoundDialog;
