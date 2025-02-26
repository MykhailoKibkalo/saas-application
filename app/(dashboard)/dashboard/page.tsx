'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { WelcomeBanner } from '@/components/dashboard/welcome-banner';
import { MetricCard } from '@/components/dashboard/metric-card';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { AreaChart } from '@/components/reports/area-chart';
import { useSession } from 'next-auth/react';
import { Metric, Activity, ReportData } from '@/lib/types';
// import { analyticsAPI, usersAPI } from '@/lib/api';
import { mockMetrics } from '@/data/mock-metrics';
import {mockActivities} from "@/data/mock-users";
import {mockReports} from "@/data/mock-reports";

export default function DashboardPage() {
    const { data: session } = useSession();
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [revenueReport, setRevenueReport] = useState<ReportData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                // In a real app, these would be API calls
                // For demo, we'll use our mock data
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                setMetrics(mockMetrics);
                setActivities(mockActivities);
                setRevenueReport(mockReports.find(r => r.id === 'report_1') || null);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="flex-1 overflow-y-auto">
            <Header title="Dashboard" />
            <main className="container mx-auto px-4 py-6">
                <WelcomeBanner userName={session?.user?.name?.split(' ')[0] || 'User'} />

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                            {metrics.map((metric) => (
                                <MetricCard key={metric.id} metric={metric} />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                            <div className="lg:col-span-2">
                                {revenueReport && (
                                    <AreaChart
                                        title={revenueReport.title}
                                        description={revenueReport.description}
                                        chartData={revenueReport.chartData}
                                    />
                                )}
                            </div>
                            <div>
                                <RecentActivity activities={activities} />
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}