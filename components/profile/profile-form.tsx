'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Profile } from '@/lib/types';
import { usersAPI } from '@/lib/api';

interface ProfileFormProps {
    profile: Profile;
    userId: string;
}

export function ProfileForm({ profile, userId }: ProfileFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Profile>({
        defaultValues: profile,
    });

    const onSubmit = async (data: Profile) => {
        setIsLoading(true);
        setSuccess(false);
        setError(null);

        try {
            // In a real app, this would call the API
            await usersAPI.updateProfile(userId, data);

            // Show success message
            setSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (err) {
            setError('An error occurred while updating your profile.');
        } finally {
            setIsLoading(false);
        }
    };

    const countryOptions = [
        { value: 'US', label: 'United States' },
        { value: 'CA', label: 'Canada' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'AU', label: 'Australia' },
        { value: 'FR', label: 'France' },
        { value: 'DE', label: 'Germany' },
        { value: 'JP', label: 'Japan' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                {...register('firstName', { required: 'First name is required' })}
                                error={errors.firstName?.message}
                            />
                            <Input
                                label="Last Name"
                                {...register('lastName', { required: 'Last name is required' })}
                                error={errors.lastName?.message}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Company"
                                {...register('company')}
                            />
                            <Input
                                label="Job Title"
                                {...register('jobTitle')}
                            />
                        </div>
                        <Input
                            label="Phone Number"
                            {...register('phone')}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            label="Street Address"
                            {...register('address')}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="City"
                                {...register('city')}
                            />
                            <Select
                                label="Country"
                                options={countryOptions}
                                {...register('country')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">
                                Bio
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                rows={4}
                                {...register('bio')}
                            ></textarea>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-4 border-t border-secondary-100 px-6 py-4">
                        {success && (
                            <div className="mr-auto text-sm text-green-600">
                                Profile updated successfully!
                            </div>
                        )}
                        {error && (
                            <div className="mr-auto text-sm text-red-600">
                                {error}
                            </div>
                        )}
                        <Button
                            type="button"
                            variant="secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isLoading}
                        >
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </form>
    );
}