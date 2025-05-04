import PageContainer from '@/components/PageContainer';
import { getGameWithPlayersById } from '@/data/game-data';
import MatchContent from '@/features/games/components/MatchContent';
import { getCurrentUser } from '@/helpers/user-helper';
import React from 'react';

type MatchIdPageProps = {
  params: Promise<{
    matchId: string;
  }>;
};

const MatchIdPage = async ({ params }: MatchIdPageProps) => {
  const { id } = await getCurrentUser();

  const { matchId } = await params;

  const existingGame = await getGameWithPlayersById(matchId);

  if (!existingGame) return <p>pas de game</p>;

  const isUserAllowed = existingGame.players.find(
    (player) => player.userId === id
  );

  if (!isUserAllowed) {
    return <p>non autorisé</p>;
  }

  return (
    <PageContainer>
      <MatchContent game={existingGame} />
    </PageContainer>
  );
};

export default MatchIdPage;
