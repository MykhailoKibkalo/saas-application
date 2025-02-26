import { ReportData } from '@/lib/types';

export const mockReports: ReportData[] = [
    {
        id: 'report_1',
        title: 'Monthly Revenue',
        description: 'Revenue trends over the last 6 months',
        type: 'line',
        chartData: {
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [30500, 32800, 36200, 41500, 44000, 45980],
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    fill: true,
                },
            ],
        },
    },
    {
        id: 'report_2',
        title: 'User Acquisition',
        description: 'New users per month',
        type: 'bar',
        chartData: {
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            datasets: [
                {
                    label: 'New Users',
                    data: [185, 210, 245, 278, 302, 327],
                    backgroundColor: '#0ea5e9',
                },
            ],
        },
    },
    {
        id: 'report_3',
        title: 'Subscription Distribution',
        description: 'Active subscriptions by plan',
        type: 'pie',
        chartData: {
            labels: ['Basic', 'Pro', 'Enterprise'],
            datasets: [
                {
                    label: 'Subscriptions',
                    data: [1245, 845, 457],
                    backgroundColor: ['#38bdf8', '#0ea5e9', '#0369a1'],
                },
            ],
        },
    },
    {
        id: 'report_4',
        title: 'Support Tickets',
        description: 'Tickets created and resolved',
        type: 'bar',
        chartData: {
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            datasets: [
                {
                    label: 'Created',
                    data: [45, 52, 49, 62, 57, 41],
                    backgroundColor: '#0ea5e9',
                },
                {
                    label: 'Resolved',
                    data: [42, 49, 53, 58, 52, 47],
                    backgroundColor: '#10b981',
                },
            ],
        },
    },
];