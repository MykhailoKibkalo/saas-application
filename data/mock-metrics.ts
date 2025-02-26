import { Metric } from '@/lib/types';

export const mockMetrics: Metric[] = [
    {
        id: 'metric_1',
        label: 'Total Users',
        value: 2547,
        change: 12.5,
        trend: 'up',
        icon: 'users',
    },
    {
        id: 'metric_2',
        label: 'Revenue',
        value: 45980,
        change: 8.2,
        trend: 'up',
        icon: 'dollar',
    },
    {
        id: 'metric_3',
        label: 'Active Projects',
        value: 187,
        change: 3.7,
        trend: 'up',
        icon: 'folder',
    },
    {
        id: 'metric_4',
        label: 'Support Tickets',
        value: 23,
        change: -5.1,
        trend: 'down',
        icon: 'ticket',
    },
];