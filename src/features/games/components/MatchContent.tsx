import React from 'react';
import { GameWithUsernameAndPoint } from '../types/game-types';
import MatchTeam from './MatchTeam';
import ButtonRcon from '../../../../ButtonRcon';

type MatchContentProps = {
  game: GameWithUsernameAndPoint;
};

const MatchContent = ({ game }: MatchContentProps) => {
  const playerTeamOne = game.players.filter(
    (player) => player.team === 'team1'
  );
  const playerTeamTwo = game.players.filter(
    (player) => player.team === 'team2'
  );

  return (
    <div className="flex items-center gap-6 p-6 bg-gray-100 rounded-2xl shadow-lg m-auto">
      <div className="flex flex-row justify-between w-full gap-8">
        <MatchTeam
          players={playerTeamOne}
          teamName={`Team 1 - ${playerTeamOne[0]?.user.username || ''}`}
        />

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Match Info</h2>
          <p className="text-lg text-gray-700">
            Mode: <span className="font-semibold">{game.mode}</span>
          </p>
          <p className="text-lg text-gray-700">
            Map: <span className="font-semibold">{game.map}</span>
          </p>
        </div>

        <MatchTeam
          players={playerTeamTwo}
          teamName={`Team 2 - ${playerTeamTwo[0]?.user.username || ''}`}
        />
      </div>

      <ButtonRcon gameId={game.id} />
    </div>
  );
};

export default MatchContent;
