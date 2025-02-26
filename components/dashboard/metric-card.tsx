import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Metric } from '@/lib/types';
import { FiArrowDown, FiArrowUp, FiDollarSign, FiFolder, FiUsers, FiMessageSquare } from 'react-icons/fi';

interface MetricCardProps {
    metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
    const getIcon = () => {
        switch (metric.icon) {
            case 'users':
                return <FiUsers size={24} />;
            case 'dollar':
                return <FiDollarSign size={24} />;
            case 'folder':
                return <FiFolder size={24} />;
            case 'ticket':
                return <FiMessageSquare size={24} />;
            default:
                return null;
        }
    };

    return (
        <Card hoverable>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-secondary-500">{metric.label}</p>
                        <h3 className="mt-1 text-2xl font-semibold text-secondary-900">
                            {metric.label.includes('Revenue')
                                ? new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    maximumFractionDigits: 0,
                                }).format(metric.value)
                                : metric.value.toLocaleString()}
                        </h3>
                    </div>
                    <div className={cn(
                        'p-2 rounded-full',
                        metric.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    )}>
                        {getIcon()}
                    </div>
                </div>
                <div className="mt-4 flex items-center">
                    {metric.trend === 'up' ? (
                        <FiArrowUp className="text-green-600 mr-1" />
                    ) : (
                        <FiArrowDown className="text-red-600 mr-1" />
                    )}
                    <span
                        className={cn(
                            'text-sm font-medium',
                            metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        )}
                    >
            {metric.change > 0 ? '+' : ''}
                        {metric.change}%
          </span>
                    <span className="text-sm text-secondary-500 ml-1">from last month</span>
                </div>
            </CardContent>
        </Card>
    );
}