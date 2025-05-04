import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type SubmitButtonProps = {
  isDisabled: boolean;
  label: string;
  className?: string;
  action?: () => void;
};

const SubmitButton = ({
  isDisabled,
  label,
  className,
  action,
}: SubmitButtonProps) => {
  return (
    <Button
      onClick={action}
      disabled={isDisabled}
      className={cn(className, 'cursor-pointer')}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
