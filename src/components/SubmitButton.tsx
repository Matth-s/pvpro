import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type SubmitButtonProps = {
  isDisabled: boolean;
  label: string;
  className?: string;
};

const SubmitButton = ({
  isDisabled,
  label,
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      disabled={isDisabled}
      className={cn(className, 'cursor-pointer')}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
