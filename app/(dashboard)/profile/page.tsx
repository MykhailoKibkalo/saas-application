'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { ProfileForm } from '@/components/profile/profile-form';
import { useSession } from 'next-auth/react';
import {Profile, User} from '@/lib/types';
import { mockProfiles } from '@/data/mock-users';

export default function ProfilePage() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const userId = (session?.user as User)?.id || '';

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                // In a real app, this would be an API call
                // For demo, we'll use our mock data
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get profile from mock data or create a default one
                const userProfile = mockProfiles[userId] || {
                    userId,
                    firstName: session?.user?.name?.split(' ')[0] || '',
                    lastName: session?.user?.name?.split(' ')[1] || '',
                };

                setProfile(userProfile);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchProfile();
        }
    }, [userId, session?.user?.name]);

    return (
        <div className="flex-1 overflow-y-auto">
            <Header title="Profile Settings" />
            <main className="container mx-auto px-4 py-6">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                ) : profile ? (
                    <ProfileForm profile={profile} userId={userId} />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-secondary-500">Profile not found</p>
                    </div>
                )}
            </main>
        </div>
    );
}