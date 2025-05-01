import Link from 'next/link';
import React from 'react';

const ForgotPasswordLink = () => {
  return (
    <div className="flex justify-end items-center">
      <Link
        href="/auth/forgot-password"
        className="text-blue-600 hover:underline text-sm"
      >
        Forgot password ?
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;
