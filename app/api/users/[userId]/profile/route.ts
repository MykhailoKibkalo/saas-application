import { NextResponse } from 'next/server';
import { mockProfiles } from '@/data/mock-users';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Profile } from '@/lib/types';

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user ID from params
        const { userId } = params;

        // Check if user has access to this profile
        const currentUserId = (session.user as any).id;
        const isAdmin = (session.user as any).role === 'admin';
        if (userId !== currentUserId && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Find the user profile
        const profile = mockProfiles[userId];
        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user ID from params
        const { userId } = params;

        // Check if user has access to this profile
        const currentUserId = (session.user as any).id;
        const isAdmin = (session.user as any).role === 'admin';
        if (userId !== currentUserId && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Parse the request body
        const profileData: Partial<Profile> = await request.json();

        // Update the profile (in a real app, this would save to a database)
        // For our mock, we'll just return the updated profile
        const currentProfile = mockProfiles[userId] || { userId };
        const updatedProfile = { ...currentProfile, ...profileData };

        return NextResponse.json(updatedProfile);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
