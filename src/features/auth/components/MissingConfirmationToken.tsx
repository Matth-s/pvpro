'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

const MissingConfirmationToken = () => {
  return (
    <Card className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold text-gray-800">
          Missing token
        </CardTitle>
        <CardDescription className="text-center text-gray-600 mt-2">
          It appears your confirmation link has expired or is invalid.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-600 mb-4">
          Please check your email and try again, or request a new
          confirmation email.
        </p>
        <Button className="py-2 w-full   px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
          Send new email
        </Button>
      </CardContent>
    </Card>
  );
};

export default MissingConfirmationToken;
