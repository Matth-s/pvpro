import Link from 'next/link';
import React from 'react';

const settingsNavLinks = [
  {
    name: 'Account',
    href: '/settings',
  },
  {
    name: 'Steam',
    href: '/settings/steam',
  },
];

const SettingsNav = () => {
  return (
    <ul className="flex flex-col gap-y-3 bg-white w-40 px-4 py-8 rounded-lg">
      {settingsNavLinks.map((link) => (
        <Link className="text-left" key={link.name} href={link.href}>
          {link.name}
        </Link>
      ))}
    </ul>
  );
};

export default SettingsNav;
