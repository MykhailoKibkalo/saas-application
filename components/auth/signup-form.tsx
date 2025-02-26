'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export function SignupForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormData>();

    const password = watch('password');

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            // In a real application, this would call the API to create the user
            // For this demo, we'll simulate a successful signup
            await new Promise(resolve => setTimeout(resolve, 1000));

            // After signup, automatically sign in
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setError('An error occurred during sign-in after registration.');
                setIsLoading(false);
                return;
            }

            router.push('/dashboard');
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-secondary-900">Create an account</h1>
                <p className="text-secondary-600 mt-2">
                    Sign up to get started with SaaSApp
                </p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                    label="Full Name"
                    type="text"
                    error={errors.name?.message}
                    {...register('name', {
                        required: 'Name is required',
                    })}
                    placeholder="John Doe"
                />

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
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                        },
                    })}
                    placeholder="••••••••"
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: value => value === password || 'Passwords do not match',
                    })}
                    placeholder="••••••••"
                />

                <div className="flex items-center">
                    <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        required
                    />
                    <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-secondary-700"
                    >
                        I agree to the{' '}
                        <a
                            href="#"
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                            href="#"
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            Privacy Policy
                        </a>
                    </label>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isLoading}
                >
                    Sign up
                </Button>

                <div className="text-center mt-4">
                    <p className="text-sm text-secondary-600">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}