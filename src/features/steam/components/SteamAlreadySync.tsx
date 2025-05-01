import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SteamAlreadySync = () => {
  return (
    <div className="flex flex-col items-center space-y-3 text-green-600 border-1 border-green-600 p-6 rounded-lg">
      <CheckCircle2 className="w-6 h-6" />
      <p className="font-semibold">
        Steam account linked successfully!
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        You can now use your Steam profile with your account.
      </p>

      <Link href={'/settings/steam'}>
        <Button className="text-white bg-green-600 cursor-pointer hover:bg-green-500">
          Back to steam account
        </Button>
      </Link>
    </div>
  );
};

export default SteamAlreadySync;
