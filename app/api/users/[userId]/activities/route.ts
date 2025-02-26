import { NextResponse } from 'next/server';
import { mockActivities } from '@/data/mock-users';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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

        // Check if user has access to these activities
        const currentUserId = (session.user as any).id;
        const isAdmin = (session.user as any).role === 'admin';
        if (userId !== currentUserId && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Filter activities for the specified user
        const userActivities = mockActivities.filter(activity => activity.userId === userId);

        return NextResponse.json(userActivities);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// app/api/subscriptions/route.ts
import { NextResponse } from 'next/server';
import { mockSubscriptions } from '@/data/mock-subscriptions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Return all subscription plans
        return NextResponse.json(mockSubscriptions);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}