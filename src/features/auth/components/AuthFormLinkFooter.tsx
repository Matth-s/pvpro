import Link from 'next/link';
import React from 'react';

type AuthFormLinkFooterProps = {
  label: string;
  href: string;
  labelHref: string;
};

const AuthFormLinkFooter = ({
  label,
  href,
  labelHref,
}: AuthFormLinkFooterProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-x-2 text-sm">
      <p>{label}</p>
      <Link
        href={href}
        className="text-blue-600 hover:underline text-sm underline"
      >
        {labelHref}
      </Link>
    </div>
  );
};

export default AuthFormLinkFooter;
