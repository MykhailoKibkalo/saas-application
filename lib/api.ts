import axios from 'axios';
import { User, Profile, Subscription, Metric, ReportData, Activity } from './types';

// Create an axios instance with defaults
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include auth token
api.interceptors.request.use((config) => {
    // In a real app, you would get the token from localStorage or a state management solution
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API functions for authentication
export const authAPI = {
    login: async (email: string, password: string) => {
        // In a real app, this would be a real API call
        // For now, we'll simulate a successful login if the credentials match our mock data
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    signup: async (name: string, email: string, password: string) => {
        const response = await api.post('/auth/signup', { name, email, password });
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },
};

// API functions for users
export const usersAPI = {
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get('/users/me');
        return response.data;
    },
    updateProfile: async (userId: string, profileData: Partial<Profile>) => {
        const response = await api.put(`/users/${userId}/profile`, profileData);
        return response.data;
    },
    getActivities: async (userId: string): Promise<Activity[]> => {
        const response = await api.get(`/users/${userId}/activities`);
        return response.data;
    },
};

// API functions for subscriptions
export const subscriptionsAPI = {
    getAll: async (): Promise<Subscription[]> => {
        const response = await api.get('/subscriptions');
        return response.data;
    },
    getCurrentSubscription: async (userId: string) => {
        const response = await api.get(`/users/${userId}/subscription`);
        return response.data;
    },
    updateSubscription: async (userId: string, subscriptionId: string) => {
        const response = await api.put(`/users/${userId}/subscription`, { subscriptionId });
        return response.data;
    },
};

// API functions for metrics and reports
export const analyticsAPI = {
    getMetrics: async (): Promise<Metric[]> => {
        const response = await api.get('/analytics/metrics');
        return response.data;
    },
    getReports: async (): Promise<ReportData[]> => {
        const response = await api.get('/analytics/reports');
        return response.data;
    },
};

// API functions for admin
export const adminAPI = {
    getAllUsers: async (): Promise<User[]> => {
        const response = await api.get('/admin/users');
        return response.data;
    },
    updateUser: async (userId: string, userData: Partial<User>) => {
        const response = await api.put(`/admin/users/${userId}`, userData);
        return response.data;
    },
    deleteUser: async (userId: string) => {
        const response = await api.delete(`/admin/users/${userId}`);
        return response.data;
    },
};