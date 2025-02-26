import { Subscription, UserSubscription } from '@/lib/types';

export const mockSubscriptions: Subscription[] = [
    {
        id: 'sub_1',
        name: 'Basic',
        description: 'Essential features for individuals and small teams',
        price: 9.99,
        features: [
            '5 projects',
            '10 GB storage',
            'Basic analytics',
            'Email support',
        ],
    },
    {
        id: 'sub_2',
        name: 'Pro',
        description: 'Advanced features for growing businesses',
        price: 29.99,
        features: [
            '15 projects',
            '50 GB storage',
            'Advanced analytics',
            'Priority support',
            'Team collaboration',
        ],
        isPopular: true,
    },
    {
        id: 'sub_3',
        name: 'Enterprise',
        description: 'Complete solution for large organizations',
        price: 99.99,
        features: [
            'Unlimited projects',
            '500 GB storage',
            'Custom analytics',
            '24/7 dedicated support',
            'Advanced security',
            'API access',
            'Custom integrations',
        ],
    },
];

export const mockUserSubscriptions: UserSubscription[] = [
    {
        id: 'usub_1',
        userId: 'usr_1',
        subscriptionId: 'sub_2',
        status: 'active',
        currentPeriodStart: new Date('2024-02-01'),
        currentPeriodEnd: new Date('2024-03-01'),
    },
    {
        id: 'usub_2',
        userId: 'usr_2',
        subscriptionId: 'sub_1',
        status: 'active',
        currentPeriodStart: new Date('2024-01-15'),
        currentPeriodEnd: new Date('2024-02-15'),
    },
    {
        id: 'usub_3',
        userId: 'usr_3',
        subscriptionId: 'sub_3',
        status: 'active',
        currentPeriodStart: new Date('2024-02-10'),
        currentPeriodEnd: new Date('2024-03-10'),
    },
];