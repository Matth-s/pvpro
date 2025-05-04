import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NotConnectedSteamCard = () => {
  return (
    <Card className="bg-gray-200 text-yellow-900 shadow-md w-fit m-auto">
      <CardHeader className="flex flex-row items-center space-x-3">
        <AlertTriangle className="w-6 h-6 text-yellow-600" />
        <CardTitle className="text-base font-semibold">
          Steam Not Connected
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">
          Your Steam account is not currently linked
        </p>
        <Link
          href={`/settings/steam?callbackUrl=${process.env.NEXT_PUBLIC_BASE_URL}`}
        >
          <Button variant="default" className="w-full cursor-pointer">
            Connect Steam Account
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default NotConnectedSteamCard;
