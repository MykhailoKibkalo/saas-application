'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/lib/types';
import { useForm } from 'react-hook-form';

interface UserActionsProps {
    user?: User | null;
    onSave: (userData: Partial<User>) => void;
    onCancel: () => void;
    isCreating?: boolean;
}

export function UserActions({ user, onSave, onCancel, isCreating = false }: UserActionsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Partial<User>>({
        defaultValues: user || {
            role: 'user',
        },
    });

    const onSubmit = async (data: Partial<User>) => {
        setIsLoading(true);
        setError(null);

        try {
            await onSave(data);
        } catch (err: unknown) {
            console.log(err);
            setError('An error occurred while saving user data.');
        } finally {
            setIsLoading(false);
        }
    };

    const roleOptions = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>{isCreating ? 'Create User' : 'Edit User'}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Name"
                        {...register('name', { required: 'Name is required' })}
                        error={errors.name?.message}
                    />

                    <Input
                        label="Email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Please enter a valid email',
                            },
                        })}
                        error={errors.email?.message}
                    />

                    <Select
                        label="Role"
                        options={roleOptions}
                        {...register('role')}
                    />

                    {isCreating && (
                        <div>
                            <Input
                                label="Password"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters',
                                    },
                                })}
                                error={errors.email?.message}
                            />
                            <p className="mt-1 text-xs text-secondary-500">
                                Must be at least 8 characters long.
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end space-x-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                    >
                        {isCreating ? 'Create' : 'Save Changes'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}