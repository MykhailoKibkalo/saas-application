import { User, Profile, Activity } from '@/lib/types';

export const mockUsers: User[] = [
    {
        id: 'usr_1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        avatar: '/avatars/john.jpg',
        createdAt: new Date('2023-01-15'),
        subscriptionId: 'sub_2',
    },
    {
        id: 'usr_2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'user',
        avatar: '/avatars/jane.jpg',
        createdAt: new Date('2023-02-20'),
        subscriptionId: 'sub_1',
    },
    {
        id: 'usr_3',
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        role: 'user',
        avatar: '/avatars/robert.jpg',
        createdAt: new Date('2023-03-10'),
        subscriptionId: 'sub_3',
    },
    {
        id: 'usr_4',
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        role: 'user',
        avatar: '/avatars/emily.jpg',
        createdAt: new Date('2023-04-05'),
        subscriptionId: 'sub_1',
    },
    {
        id: 'usr_5',
        name: 'Michael Wilson',
        email: 'michael.wilson@example.com',
        role: 'user',
        avatar: '/avatars/michael.jpg',
        createdAt: new Date('2023-05-18'),
        subscriptionId: 'sub_2',
    },
];

export const mockProfiles: Record<string, Profile> = {
    usr_1: {
        userId: 'usr_1',
        firstName: 'John',
        lastName: 'Doe',
        company: 'Acme Inc',
        jobTitle: 'CTO',
        phone: '+1 (123) 456-7890',
        address: '123 Main St',
        city: 'San Francisco',
        country: 'USA',
        bio: 'Experienced technology leader with a passion for innovative solutions.',
    },
    usr_2: {
        userId: 'usr_2',
        firstName: 'Jane',
        lastName: 'Smith',
        company: 'Tech Innovators',
        jobTitle: 'Product Manager',
        phone: '+1 (234) 567-8901',
        address: '456 Oak Ave',
        city: 'New York',
        country: 'USA',
        bio: 'Product enthusiast focused on user experience and market fit.',
    },
};

export const mockActivities: Activity[] = [
    {
        id: 'act_1',
        userId: 'usr_1',
        action: 'Logged in',
        timestamp: new Date('2024-02-25T09:30:00'),
    },
    {
        id: 'act_2',
        userId: 'usr_1',
        action: 'Updated profile',
        timestamp: new Date('2024-02-25T10:15:00'),
    },
    {
        id: 'act_3',
        userId: 'usr_2',
        action: 'Changed subscription',
        timestamp: new Date('2024-02-24T14:20:00'),
        details: 'Upgraded to Pro plan',
    },
    {
        id: 'act_4',
        userId: 'usr_3',
        action: 'Created report',
        timestamp: new Date('2024-02-24T11:45:00'),
        details: 'Monthly performance report',
    },
    {
        id: 'act_5',
        userId: 'usr_4',
        action: 'Invited team member',
        timestamp: new Date('2024-02-23T16:30:00'),
        details: 'Sent invitation to alex@example.com',
    },
];