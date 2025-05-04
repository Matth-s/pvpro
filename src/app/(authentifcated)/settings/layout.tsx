import React from 'react';
import SettingsNav from './_components/SettingsNav';

type SettingsLayoutProps = {
  children: React.ReactNode;
};

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="flex flex-row gap-x-8 h-8/12 w-4/5 m-auto">
      <SettingsNav />
      <div className="flex items-center justify-center w-full bg-white rounded-lg p-8">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
