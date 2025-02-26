'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Use NextAuth signIn method
            const result = await signIn('credentials', {
                email: 'john.doe@example.com', // Default admin from mock data
                password: 'password',
                redirect: false,
            });

            if (result?.error) {
                setError('Login failed. Please check your credentials.');
                setIsLoading(false);
                return;
            }

            if (result?.ok) {
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An unexpected error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    // Alternatively, provide a debug login option
    const handleFakeLogin = () => {
        // Set something in localStorage to imitate login state
        localStorage.setItem('fakeAuth', 'true');
        router.push('/dashboard');
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-secondary-900">Welcome back</h1>
                <p className="text-secondary-600 mt-2">
                    Sign in to your account to continue
                </p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                <Button
                    className="w-full"
                    onClick={handleLogin}
                    isLoading={isLoading}
                >
                    Sign in with NextAuth
                </Button>

                <div className="text-center">
                    <p className="text-sm text-secondary-600">or</p>
                </div>

                <Button
                    variant="secondary"
                    className="w-full"
                    onClick={handleFakeLogin}
                >
                    Debug Login (bypass NextAuth)
                </Button>

                <div className="text-center mt-4">
                    <p className="text-sm text-secondary-600">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/signup"
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}