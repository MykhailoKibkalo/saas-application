'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface LoginFormData {
    email: string;
    password: string;
}

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Please enter a valid email',
                        },
                    })}
                    placeholder="you@example.com"
                />

                <Input
                    label="Password"
                    type="password"
                    error={errors.password?.message}
                    {...register('password', {
                        required: 'Password is required',
                    })}
                    placeholder="••••••••"
                />

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        />
                        <label
                            htmlFor="remember"
                            className="ml-2 block text-sm text-secondary-700"
                        >
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a
                            href="#"
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isLoading}
                >
                    Sign in
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
            </form>
        </div>
    );
}