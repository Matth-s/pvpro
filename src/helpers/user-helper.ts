import { auth } from '@/lib/auth/auth';
import { redirect, unauthorized } from 'next/navigation';

export const getCurrentUser = async () => {
  const session = await auth();

  if (!session?.user) redirect('/auth/login');

  return session.user;
};

export const getCurrentUserServerAction = async () => {
  const session = await auth();

  if (!session?.user) unauthorized();

  return session.user;
};
