import { NextResponse } from 'next/server';
import { mockUserSubscriptions } from '@/data/mock-subscriptions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { User, UserSubscription } from '@/lib/types';

export async function GET(request: Request) {
    try {
        // Отримуємо userId з URL
        const { pathname } = new URL(request.url);
        const userId = pathname.split('/').slice(-2, -1)[0]; // Витягуємо userId

        if (!userId) {
            return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
        }

        // Перевірка автентифікації
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Перевіряємо доступ
        const currentUserId = (session.user as User).id;
        const isAdmin = (session.user as User).role === 'admin';
        if (userId !== currentUserId && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Знаходимо підписку користувача
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

export async function PUT(request: Request) {
    try {
        // Отримуємо userId з URL
        const { pathname } = new URL(request.url);
        const userId = pathname.split('/').slice(-2, -1)[0]; // Витягуємо userId

        if (!userId) {
            return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
        }

        // Перевірка автентифікації
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Перевіряємо доступ
        const currentUserId = (session.user as User).id;
        const isAdmin = (session.user as User).role === 'admin';
        if (userId !== currentUserId && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Парсимо body
        const { subscriptionId } = await request.json();

        // Знаходимо поточну підписку користувача
        const existingSubscription = mockUserSubscriptions.find(sub => sub.userId === userId);

        // Оновлення або створення нової підписки
        let updatedSubscription: UserSubscription;
        if (existingSubscription) {
            updatedSubscription = {
                ...existingSubscription,
                subscriptionId,
                status: 'active',
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 днів
            };
        } else {
            updatedSubscription = {
                id: `usub_${Date.now()}`,
                userId,
                subscriptionId,
                status: 'active',
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 днів
            };
        }

        return NextResponse.json(updatedSubscription);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
