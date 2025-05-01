'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { attachSteamAction } from '../actions/attach-steam-action';
import { formatRootMessageFormError } from '@/utils/format-form-root-error';
import { Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type AttachSteamCallbackProps = {
  params: Record<string, string>;
};

const AttachSteamCallback = ({
  params,
}: AttachSteamCallbackProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    startTransition(() => {
      attachSteamAction(params)
        .then((res) => {
          if (res?.error) return setErrorMessage(res.error);
          toast('Steam sync succesfully');
          router.push('/settings/steam');
        })
        .catch((err) => {
          setErrorMessage(formatRootMessageFormError(err));
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, [params]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-whiteborder rounded-lg shadow-md p-6 text-center">
        {isLoading && (
          <div className="flex flex-col items-center space-y-3">
            <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Linking your Steam account...
            </p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="flex flex-col items-center space-y-3 text-red-600">
            <AlertCircle className="w-6 h-6" />
            <p className="font-semibold">
              Failed to link Steam account
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {errorMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttachSteamCallback;
