'use client';

import {Sidebar} from '@/components/layout/sidebar';
import {Footer} from '@/components/layout/footer';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const {data: session, status} = useSession();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && status === 'unauthenticated') {
            window.location.href = '/login'; // Використовуйте window.location.href замість redirect
        }
    }, [mounted, status]);

    // Show loading state while session is loading
    if (!mounted || status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    // If authenticated, show dashboard layout
    return (
        <div className="min-h-screen flex">
            <Sidebar
                user={{
                    name: session?.user?.name || 'User',
                    email: session?.user?.email || 'user@example.com',
                    role: (session?.user as any)?.role || 'user',
                }}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                {children}
                <Footer/>
            </div>
        </div>
    );
}