export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    avatar?: string;
    createdAt: Date;
    subscriptionId?: string;
    password?: string;
}

export interface Profile {
    userId: string;
    firstName: string;
    lastName: string;
    company?: string;
    jobTitle?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    bio?: string;
}

export interface Subscription {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
    isPopular?: boolean;
}

export interface UserSubscription {
    id: string;
    userId: string;
    subscriptionId: string;
    status: 'active' | 'canceled' | 'past_due';
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
}

export interface Metric {
    id: string;
    label: string;
    value: number;
    change: number; // percentage change
    trend: 'up' | 'down';
    icon?: string;
}

export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor?: string | string[];
        borderColor?: string;
        fill?: boolean;
    }[];
}

export interface ReportData {
    id: string;
    title: string;
    description: string;
    type: 'bar' | 'line' | 'pie' | 'area';
    chartData: ChartData;
}

export interface Activity {
    id: string;
    userId: string;
    action: string;
    timestamp: Date;
    details?: string;
}