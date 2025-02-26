'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { AreaChart } from '@/components/reports/area-chart';
import { BarChart } from '@/components/reports/bar-chart';
import { DataTable } from '@/components/reports/data-table';
import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { ReportData } from '@/lib/types';
import { mockReports } from '@/data/mock-reports';
import { FiDownload, FiRefreshCw, FiCalendar } from 'react-icons/fi';

export default function ReportsPage() {
    const [reports, setReports] = useState<ReportData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('6months');

    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true);
            try {
                // In a real app, this would be an API call
                // For demo, we'll use our mock data
                await new Promise(resolve => setTimeout(resolve, 1000));

                setReports(mockReports);
            } catch (error) {
                console.error('Error fetching reports:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    const timeframeOptions = [
        { value: '30days', label: 'Last 30 Days' },
        { value: '3months', label: 'Last 3 Months' },
        { value: '6months', label: 'Last 6 Months' },
        { value: '12months', label: 'Last 12 Months' },
    ];

    // Sample data for the table
    const tableData = [
        { product: 'Basic Plan', revenue: '$10,245', customers: 1245, growth: '+12.3%' },
        { product: 'Pro Plan', revenue: '$25,410', customers: 845, growth: '+23.1%' },
        { product: 'Enterprise Plan', revenue: '$45,678', customers: 457, growth: '+8.7%' },
        { product: 'Add-ons', revenue: '$5,432', customers: 632, growth: '+15.2%' },
    ];

    const tableColumns = [
        { key: 'product', label: 'Product' },
        { key: 'revenue', label: 'Revenue' },
        { key: 'customers', label: 'Customers' },
        { key: 'growth', label: 'Growth' },
    ];

    return (
        <div className="flex-1 overflow-y-auto">
            <Header title="Reports & Analytics" />
            <main className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h1 className="text-2xl font-bold text-secondary-900">Performance Reports</h1>
                    <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <div className="flex items-center space-x-2">
                            <FiCalendar className="text-secondary-500" />
                            <Select
                                options={timeframeOptions}
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="w-40"
                            />
                        </div>
                        <Button variant="outline" className="flex items-center">
                            <FiRefreshCw className="mr-2" /> Refresh
                        </Button>
                        <Button variant="primary" className="flex items-center">
                            <FiDownload className="mr-2" /> Export Reports
                        </Button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {reports
                                .filter(report => report.type === 'line' || report.type === 'area')
                                .slice(0, 2)
                                .map(report => (
                                    <AreaChart
                                        key={report.id}
                                        title={report.title}
                                        description={report.description}
                                        chartData={report.chartData}
                                    />
                                ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {reports
                                .filter(report => report.type === 'bar')
                                .slice(0, 2)
                                .map(report => (
                                    <BarChart
                                        key={report.id}
                                        title={report.title}
                                        description={report.description}
                                        chartData={report.chartData}
                                    />
                                ))}
                        </div>

                        <DataTable
                            title="Revenue by Product"
                            description="Breakdown of revenue by product for the selected timeframe"
                            data={tableData}
                            columns={tableColumns}
                        />
                    </>
                )}
            </main>
        </div>
    );
}
