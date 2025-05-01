import MissingTokenResetPassword from '@/features/auth/components/MissingTokenResetPassword';
import ResetPasswordForm from '@/features/auth/components/ResetPasswordForm';
import React from 'react';

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

const ResetPasswordPage = async ({
  searchParams,
}: ResetPasswordPageProps) => {
  const token = (await searchParams).token;

  if (!token) return <MissingTokenResetPassword />;

  return <ResetPasswordForm token={token} />;
};

export default ResetPasswordPage;
