import { cn } from '@/lib/utils';
import React from 'react';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer = ({
  children,
  className,
}: PageContainerProps) => {
  return (
    <div className={cn('w-4/5 mx-auto', className)}>{children}</div>
  );
};

export default PageContainer;
