'use client';

import { cn } from '@/lib/utils';
import { Player } from '@prisma/client';
import { UserIcon } from 'lucide-react';

type FoundGamePlayerCardProps = {
  players: Player[];
};

const FoundGamePlayerCard = ({
  players,
}: FoundGamePlayerCardProps) => {
  return (
    <div className="flex gap-x-2 w-fit mx-auto">
      {players.map((player) => (
        <div
          key={player.id}
          className={cn(
            'p-3 rounded-md border-2 transition-all',
            player.status === 'joined'
              ? 'border-green-600 opacity-100'
              : 'border-gray-600 opacity-40'
          )}
        >
          <UserIcon className="w-6 h-6" color="#0d542b" />
        </div>
      ))}
    </div>
  );
};

export default FoundGamePlayerCard;
