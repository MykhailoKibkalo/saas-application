'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { FiBell, FiSearch } from 'react-icons/fi';

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <header className="bg-white h-16 border-b border-secondary-100 flex items-center px-6">
            <h1 className="text-xl font-semibold text-secondary-900 flex-1">
                {title}
            </h1>
            <div className="relative mr-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="py-2 pl-10 pr-4 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                />
                <FiSearch
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                    size={18}
                />
            </div>
            <div className="flex items-center space-x-4">
                <button className="text-secondary-500 hover:text-secondary-700 relative">
                    <FiBell size={20} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
                </button>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => signOut({ callbackUrl: '/login' })}
                >
                    Sign Out
                </Button>
            </div>
        </header>
    );
}