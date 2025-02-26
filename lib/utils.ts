import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for combining Tailwind classes conditionally
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
}

// Format date
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(date));
}

// Format relative time
export function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
        return 'just now';
    } else if (diffMin < 60) {
        return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else if (diffHour < 24) {
        return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffDay < 30) {
        return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else {
        return formatDate(date);
    }
}

// Create a mock API response with delay
export async function mockApiResponse<T>(data: T, delay = 500): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
}