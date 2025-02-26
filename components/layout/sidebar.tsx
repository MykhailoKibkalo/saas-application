'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiHome, FiUser, FiCreditCard, FiBarChart2, FiUsers, FiMenu, FiX } from 'react-icons/fi';

interface SidebarProps {
    className?: string;
    user: {
        name: string;
        email: string;
        role: 'user' | 'admin';
    };
}

export function Sidebar({ className, user }: SidebarProps) {
    const [expanded, setExpanded] = useState(true);
    const pathname = usePathname();

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    const navItems = [
        {
            label: 'Dashboard',
            href: '/dashboard',
            icon: FiHome,
        },
        {
            label: 'Profile',
            href: '/profile',
            icon: FiUser,
        },
        {
            label: 'Billing',
            href: '/billing',
            icon: FiCreditCard,
        },
        {
            label: 'Reports',
            href: '/reports',
            icon: FiBarChart2,
        },
    ];

    // Add admin route if user is an admin
    if (user.role === 'admin') {
        navItems.push({
            label: 'Admin',
            href: '/admin',
            icon: FiUsers,
        });
    }

    return (
        <div
            className={cn(
                'bg-white h-screen border-r border-secondary-100 transition-all duration-300 flex flex-col',
                expanded ? 'w-64' : 'w-20',
                className
            )}
        >
            <div className="h-16 flex items-center px-4 border-b border-secondary-100">
                <div
                    className={cn(
                        'flex items-center transition-all duration-300',
                        expanded ? 'justify-between w-full' : 'justify-center'
                    )}
                >
                    {expanded ? (
                        <span className="font-bold text-xl text-primary-600">SaaSApp</span>
                    ) : (
                        <span className="font-bold text-xl text-primary-600">S</span>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="text-secondary-500 hover:text-secondary-700"
                    >
                        {expanded ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto flex-1 py-4">
                <nav className="space-y-1 px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center py-2 px-3 rounded-md transition-colors',
                                    {
                                        'bg-primary-50 text-primary-700': isActive,
                                        'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900': !isActive,
                                        'justify-center': !expanded,
                                    }
                                )}
                            >
                                <item.icon
                                    size={20}
                                    className={cn(expanded ? 'mr-3' : 'mx-auto')}
                                />
                                {expanded && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-secondary-100">
                <div
                    className={cn(
                        'flex items-center transition-all duration-300',
                        expanded ? 'flex-row' : 'flex-col'
                    )}
                >
                    <div
                        className={cn(
                            'bg-primary-100 rounded-full w-10 h-10 flex items-center justify-center text-primary-700 font-medium',
                            expanded ? 'mr-3' : 'mb-2'
                        )}
                    >
                        {user.name.charAt(0)}
                    </div>
                    {expanded && (
                        <div className="overflow-hidden">
                            <div className="font-medium text-secondary-900 truncate">
                                {user.name}
                            </div>
                            <div className="text-xs text-secondary-500 truncate">
                                {user.email}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}