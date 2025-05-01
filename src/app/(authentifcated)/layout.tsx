import React from 'react';
import Header from './_components/Header';

type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
