'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React, {
  useCallback,
  useEffect,
  useState,
  useTransition,
} from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatRootMessageFormError } from '@/utils/format-form-root-error';
import FormRootMessage from '@/components/FormRootMessage';
import { verifyToken } from '../actions/verify-token';
import BeatLoader from 'react-spinners/BeatLoader';

type ConfirmEmailProps = {
  token: string;
};

const ConfirmEmail = ({ token }: ConfirmEmailProps) => {
  const [error, setError] = useState<undefined | string>(undefined);
  const [success, setSuccess] = useState<boolean>();
  const [isPending, startTransition] = useTransition();

  const onSubmit = useCallback(() => {
    setError(undefined);

    startTransition(async () => {
      try {
        const res = await verifyToken(token);

        if (res?.error) {
          return setError(res.error);
        }
        setSuccess(true);
      } catch (err) {
        setError(formatRootMessageFormError(err));
      }
    });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [token]);

  return (
    <Card className="sm:w-[400px] w-full shadow-md rounded-xl bg-white p-6">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-gray-800">
          Email vérification
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-6">
        {isPending && <BeatLoader color="#007bff" size={20} />}

        {error && <FormRootMessage message={error} />}

        {success && (
          <p className="text-center text-lg text-green-600">
            Your email has been successfully verified.
          </p>
        )}

        {!isPending && !error && !success && (
          <p className="text-center text-sm text-gray-600">
            Confirmation in progress...
          </p>
        )}

        {success ? (
          <Link href={'/auth/login'}>
            <Button className="mt-4">Signin</Button>
          </Link>
        ) : (
          <p>erreur</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfirmEmail;
