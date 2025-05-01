'use client';

import React from 'react';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ControllerRenderProps } from 'react-hook-form';

type OptInputProps = {
  field: ControllerRenderProps<
    {
      usernameOrEmail: string;
      password: string;
      code?: string | undefined;
    },
    'code'
  >;
};

const OptInput = ({ field }: OptInputProps) => {
  return (
    <InputOTP maxLength={6} {...field}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
};

export default OptInput;
