'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { FiEdit, FiTrash, FiSearch, FiFilter } from 'react-icons/fi';

interface UserTableProps {
    users: User[];
    onEdit: (userId: string) => void;
    onDelete: (userId: string) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'admin' | 'user'>('all');

    const filteredUsers = users
        .filter((user) => {
            if (filter === 'all') return true;
            return user.role === filter;
        })
        .filter((user) => {
            if (!searchTerm) return true;
            const term = searchTerm.toLowerCase();
            return (
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term)
            );
        });

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <CardTitle>User Management</CardTitle>
                    <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="py-2 pl-10 pr-4 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FiSearch
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                                size={18}
                            />
                        </div>
                        <div className="relative">
                            <select
                                className="py-2 pl-10 pr-4 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as 'all' | 'admin' | 'user')}
                            >
                                <option value="all">All Users</option>
                                <option value="admin">Admins</option>
                                <option value="user">Regular Users</option>
                            </select>
                            <FiFilter
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                                size={18}
                            />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-secondary-50 border-b border-secondary-200">
                            <th className="px-4 py-3 text-left text-sm font-medium text-secondary-700">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-secondary-700">
                                Email
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-secondary-700">
                                Role
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-secondary-700">
                                Joined
                            </th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-secondary-700">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b border-secondary-200 hover:bg-secondary-50"
                            >
                                <td className="px-4 py-3 text-sm text-secondary-700">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-medium">{user.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-secondary-700">
                                    {user.email}
                                </td>
                                <td className="px-4 py-3 text-sm">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                        }`}
                    >
                      {user.role}
                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-secondary-700">
                                    {formatDate(user.createdAt)}
                                </td>
                                <td className="px-4 py-3 text-sm text-secondary-700 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => onEdit(user.id)}
                                        >
                                            <FiEdit size={16} />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => onDelete(user.id)}
                                        >
                                            <FiTrash size={16} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}