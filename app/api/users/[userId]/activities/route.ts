import { NextResponse } from 'next/server';
import { mockActivities } from '@/data/mock-users';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { User } from '@/lib/types';

export async function GET(request: Request) {
    try {
        // Отримуємо userId з URL (Request)
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

        // Фільтруємо активності користувача
        const userActivities = mockActivities.filter(activity => activity.userId === userId);

        return NextResponse.json(userActivities);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
