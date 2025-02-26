import { NextResponse } from 'next/server';
import { mockProfiles } from '@/data/mock-users';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Profile, User } from '@/lib/types';

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

        // Отримуємо профіль користувача
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

        // Отримуємо та оновлюємо дані профілю
        const profileData: Partial<Profile> = await request.json();
        const currentProfile = mockProfiles[userId] || { userId };
        const updatedProfile = { ...currentProfile, ...profileData };

        return NextResponse.json(updatedProfile);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
