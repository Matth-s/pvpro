import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const MissingTokenResetPassword = () => {
  return (
    <div>
      <div className="w-full h-[70vh] flex flex-col justify-center items-center text-center px-4">
        <AlertTriangle className="text-yellow-500 w-12 h-12 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">
          Missing or Invalid Code
        </h2>
        <p className="text-gray-600 mt-2">
          The link you followed is incomplete or the token is missing
          from the URL.
        </p>
        <Link
          href="/auth/login"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default MissingTokenResetPassword;
