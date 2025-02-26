'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { UserTable } from '@/components/admin/user-table';
import { UserActions } from '@/components/admin/user-actions';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { User } from '@/lib/types';
import { mockUsers } from '@/data/mock-users';
import { redirect } from 'next/navigation';
import { FiUserPlus } from 'react-icons/fi';

export default function AdminPage() {
    const { data: session } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isCreatingUser, setIsCreatingUser] = useState(false);

    // Check if user is admin
    const isAdmin = (session?.user as User)?.role === 'admin';

    useEffect(() => {
        // If not admin, redirect to dashboard
        if (session && !isAdmin) {
            redirect('/dashboard');
        }
    }, [session, isAdmin]);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                // In a real app, this would be an API call
                // For demo, we'll use our mock data
                await new Promise(resolve => setTimeout(resolve, 1000));

                setUsers(mockUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isAdmin) {
            fetchUsers();
        }
    }, [isAdmin]);

    const handleEdit = (userId: string) => {
        const user = users.find(u => u.id === userId);
        if (user) {
            setEditingUser(user);
            setIsCreatingUser(false);
        }
    };

    const handleDelete = async (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                // In a real app, this would be an API call
                // For demo, we'll simulate deletion
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Remove the user from our local state
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleSave = async (userData: Partial<User>) => {
        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (isCreatingUser) {
                // Create new user
                const newUser: User = {
                    id: `usr_${Date.now()}`,
                    name: userData.name || 'New User',
                    email: userData.email || 'user@example.com',
                    role: userData.role || 'user',
                    createdAt: new Date(),
                };
                setUsers([...users, newUser]);
                setIsCreatingUser(false);
            } else if (editingUser) {
                // Update existing user
                const updatedUsers = users.map(user =>
                    user.id === editingUser.id ? { ...user, ...userData } : user
                );
                setUsers(updatedUsers);
                setEditingUser(null);
            }
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    };

    return (
        <div className="flex-1 overflow-y-auto">
            <Header title="Admin Panel" />
            <main className="container mx-auto px-4 py-6">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {editingUser || isCreatingUser ? (
                            <UserActions
                                user={isCreatingUser ? undefined : editingUser}
                                onSave={handleSave}
                                onCancel={() => {
                                    setEditingUser(null);
                                    setIsCreatingUser(false);
                                }}
                                isCreating={isCreatingUser}
                            />
                        ) : (
                            <div className="flex justify-end mb-4">
                                <Button
                                    onClick={() => setIsCreatingUser(true)}
                                    className="flex items-center"
                                >
                                    <FiUserPlus className="mr-2" /> Add User
                                </Button>
                            </div>
                        )}

                        <UserTable
                            users={users}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                )}
            </main>
        </div>
    );
}