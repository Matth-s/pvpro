import { getCurrentUser } from '@/helpers/user-helper';
import React from 'react';

const HomePage = async () => {
  await getCurrentUser();

  return <div>home page</div>;
};

export default HomePage;
