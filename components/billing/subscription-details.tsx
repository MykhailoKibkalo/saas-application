import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserSubscription } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { mockSubscriptions } from '@/data/mock-subscriptions';

interface SubscriptionDetailsProps {
    subscription: UserSubscription;
}

export function SubscriptionDetails({ subscription }: SubscriptionDetailsProps) {
    const plan = mockSubscriptions.find(s => s.id === subscription.subscriptionId);

    if (!plan) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Current Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-secondary-600">Plan</span>
                    <span className="font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-secondary-600">Status</span>
                    <span className="capitalize font-medium">
            {subscription.status === 'active' ? (
                <span className="text-green-600">Active</span>
            ) : subscription.status === 'past_due' ? (
                <span className="text-yellow-600">Past Due</span>
            ) : (
                <span className="text-red-600">Canceled</span>
            )}
          </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-secondary-600">Price</span>
                    <span className="font-medium">{formatCurrency(plan.price)}/month</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-secondary-600">Billing Period</span>
                    <span className="font-medium">
            {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
          </span>
                </div>
                <div className="pt-3 border-t border-secondary-200">
                    <div className="flex items-center justify-between">
                        <div className="text-secondary-600">Payment Method</div>
                        <div className="flex items-center">
                            <svg
                                className="h-6 w-10 mr-2"
                                viewBox="0 0 40 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width="40" height="24" rx="4" fill="#0A2540" />
                                <path
                                    d="M19.5 10C19.5 8.34 20.8595 7 22.5 7H25.5C27.1405 7 28.5 8.34 28.5 10C28.5 11.66 27.1405 13 25.5 13H22.5C20.8595 13 19.5 11.66 19.5 10Z"
                                    fill="#80B9F9"
                                />
                                <path
                                    d="M11.5 17C11.5 15.34 12.8595 14 14.5 14H17.5C19.1405 14 20.5 15.34 20.5 17C20.5 18.66 19.1405 20 17.5 20H14.5C12.8595 20 11.5 18.66 11.5 17Z"
                                    fill="#80B9F9"
                                />
                                <path
                                    d="M11.5 7H14.5V13H11.5V7Z"
                                    fill="#80B9F9"
                                />
                                <path
                                    d="M25.5 14H28.5V20H25.5V14Z"
                                    fill="#80B9F9"
                                />
                            </svg>
                            <span className="font-medium">•••• 4242</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}