import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { mockUsers } from '@/data/mock-users';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // In a real app, you would verify against a database
                // For our mock, we'll just check if the email exists in our mock data
                // and assume any password is correct for demonstration
                const user = mockUsers.find(user => user.email === credentials.email);

                if (!user) {
                    return null;
                }

                // In a real app, you would compare the hashed password
                // For our mock, we'll just return the user
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as 'user' | 'admin';
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/',
        error: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET || 'a-very-secret-key-that-should-be-in-env',
};