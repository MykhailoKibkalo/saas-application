import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import NextAuthProvider from '@/lib/providers';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'SaaSApp - Your Business Solution',
    description: 'Modern SaaS application for businesses',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
        </body>
        </html>
    );
}
