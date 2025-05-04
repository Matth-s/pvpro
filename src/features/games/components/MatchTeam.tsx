import React from 'react';
import { PlayerWithUsernameAndPoint } from '../types/game-types';

type MatchTeamProps = {
  teamName: string;
  players: PlayerWithUsernameAndPoint[];
};

const MatchTeam = ({ teamName, players }: MatchTeamProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-xs">
      <h3 className="text-lg font-bold mb-4 text-center">
        {teamName}
      </h3>
      <ul className="space-y-2">
        {players.map((player) => (
          <li
            key={player.id}
            className="flex justify-between pb-2 text-sm text-gray-800"
          >
            <span>{player.user.username}</span>
            <span>{player.user.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchTeam;
