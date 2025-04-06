'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // Optional utility for class merging

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto">
        <ul className="flex flex-wrap gap-4 md:gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'block px-3 py-2 text-gray-200 rounded-md transition-all',
                  'hover:bg-gray-700 hover:text-white',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  pathname === item.href 
                    ? 'bg-gray-900 text-white font-medium' 
                    : ''
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;