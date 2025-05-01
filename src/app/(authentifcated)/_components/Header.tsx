import Link from 'next/link';
import React from 'react';

const navLinks = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'History',
    href: '/history',
  },
  {
    name: 'Settings',
    href: '/settings',
  },
];

const Header = () => {
  return (
    <header className="w-3/5 mx-auto mt-4 p-4 bg-gray-700 rounded-lg h-fit">
      <nav>
        <ul className="flex flex-row gap-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white font-bold"
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
