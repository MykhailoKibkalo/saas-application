'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartData } from '@/lib/types';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

interface AreaChartProps {
    title: string;
    description?: string;
    chartData: ChartData;
    height?: number;
}

export function AreaChart({ title, description, chartData, height = 300 }: AreaChartProps) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Destroy previous chart instance
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create new chart
        const ctx = chartRef.current.getContext('2d');
        if (ctx) {
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                            },
                        },
                    },
                    elements: {
                        line: {
                            tension: 0.3,
                        },
                        point: {
                            radius: 2,
                            hoverRadius: 5,
                        },
                    },
                },
            });
        }

        // Clean up function
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <p className="text-sm text-secondary-500">{description}</p>}
            </CardHeader>
            <CardContent>
                <div style={{ height: `${height}px` }}>
                    <canvas ref={chartRef}></canvas>
                </div>
            </CardContent>
        </Card>
    );
}