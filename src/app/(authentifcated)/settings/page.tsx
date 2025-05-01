import { getCurrentUser } from '@/helpers/user-helper';
import React from 'react';

const SettingsPage = async () => {
  await getCurrentUser();

  return <div>SettingsPage</div>;
};

export default SettingsPage;
