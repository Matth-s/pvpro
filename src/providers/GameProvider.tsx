'use client';

import { getGameAndPlayersByUserId } from '@/data/game-data';
import GameFoundDialog from '@/features/games/components/GameFoundDialog';
import { checkIfAllUsersAreReady } from '@/features/games/utils/game-utils';
import {
  setGame,
  setShowAccessLink,
  setUpdateGamePlayer,
} from '@/lib/store/features/game-slice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import supabase from '@/lib/supabase';
import { Player } from '@prisma/client';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

type GameProviderProps = {
  children: React.ReactNode;
  userId: string;
};

const GameProvider = ({ children, userId }: GameProviderProps) => {
  const dispatch = useAppDispatch();
  const { game, showAccessLink } = useAppSelector(
    (state) => state.game
  );
  const pathName = usePathname();

  const userIsInMatchPage = pathName.startsWith('/match');

  const searchGame = async () => {
    if (game) return;
    const findGame = await getGameAndPlayersByUserId(userId);

    dispatch(setGame(findGame));
  };

  useEffect(() => {
    if (!game) return;
    const isAllUserAreReady = checkIfAllUsersAreReady(game.players);

    dispatch(setShowAccessLink(isAllUserAreReady));
  }, [game, dispatch]);

  useEffect(() => {
    const gameChannel = supabase
      .channel(`player:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Player',
        },
        async (payload) => {
          await searchGame();

          if (payload.eventType === 'UPDATE') {
            dispatch(setUpdateGamePlayer(payload.new as Player));
          }

          if (payload.eventType === 'DELETE') {
            dispatch(setGame(null));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(gameChannel);
    };
  }, [userId, dispatch]);

  return (
    <>
      {children}

      {!userIsInMatchPage && (
        <GameFoundDialog
          game={game}
          userId={userId}
          showAccessLink={showAccessLink}
        />
      )}
    </>
  );
};

export default GameProvider;
