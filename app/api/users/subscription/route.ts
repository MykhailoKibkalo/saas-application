import { NextResponse } from 'next/server';
import { mockUserSubscriptions } from '@/data/mock-subscriptions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserSubscription } from '@/lib/types';

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

        // Check if user has access to this subscription
        const currentUserId = (session.user as any).id;
        const isAdmin = (session.user as any).role === 'admin';
        if (userId !== currentUserId && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Find the user subscription
        const subscription = mockUserSubscriptions.find(sub => sub.userId === userId);
        if (!subscription) {
            return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
        }

        return NextResponse.json(subscription);
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

        // Check if user has access to this subscription
        const currentUserId = (session.user as any).id;
        const isAdmin = (session.user as any).role === 'admin';
        if (userId !== currentUserId && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Parse the request body
        const { subscriptionId } = await request.json();

        // Find the existing subscription
        const existingSubscription = mockUserSubscriptions.find(sub => sub.userId === userId);

        // Create the updated subscription
        let updatedSubscription: UserSubscription;
        if (existingSubscription) {
            // Update existing subscription
            updatedSubscription = {
                ...existingSubscription,
                subscriptionId,
                status: 'active',
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days later
            };
        } else {
            // Create new subscription
            updatedSubscription = {
                id: `usub_${Date.now()}`,
                userId,
                subscriptionId,
                status: 'active',
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days later
            };
        }

        // In a real app, this would save to a database
        // For our mock, we'll just return the updated subscription
        return NextResponse.json(updatedSubscription);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}