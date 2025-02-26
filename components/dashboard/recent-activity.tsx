import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/utils';
import { Activity } from '@/lib/types';

interface RecentActivityProps {
    activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {activities.map((activity) => (
                        <li key={activity.id} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary-500"></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-secondary-900">
                                    {activity.action}
                                    {activity.details && (
                                        <span className="font-normal text-secondary-600">
                      {' '}
                                            - {activity.details}
                    </span>
                                    )}
                                </p>
                                <p className="text-xs text-secondary-500">
                                    {formatRelativeTime(activity.timestamp)}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}