'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { PlanCard } from '@/components/billing/plan-card';
import { SubscriptionDetails } from '@/components/billing/subscription-details';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { Subscription, UserSubscription } from '@/lib/types';
import { mockSubscriptions, mockUserSubscriptions } from '@/data/mock-subscriptions';

export default function BillingPage() {
    const { data: session } = useSession();
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isChangingPlan, setIsChangingPlan] = useState(false);

    const userId = (session?.user as any)?.id || '';

    useEffect(() => {
        const fetchSubscriptionData = async () => {
            setIsLoading(true);
            try {
                // In a real app, these would be API calls
                // For demo, we'll use our mock data
                await new Promise(resolve => setTimeout(resolve, 1000));

                setSubscriptions(mockSubscriptions);

                const subscription = mockUserSubscriptions.find(s => s.userId === userId);
                setUserSubscription(subscription || null);
            } catch (error) {
                console.error('Error fetching subscription data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchSubscriptionData();
        }
    }, [userId]);

    const handleSelectPlan = async (subscriptionId: string) => {
        if (!userId) return;

        setIsChangingPlan(true);
        try {
            // In a real app, this would be an API call
            // For demo, we'll simulate saving
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Update the user subscription locally
            if (userSubscription) {
                const updatedSubscription = {
                    ...userSubscription,
                    subscriptionId,
                    status: 'active' as const,
                    currentPeriodStart: new Date(),
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days later
                };
                setUserSubscription(updatedSubscription);
            } else {
                const newSubscription: UserSubscription = {
                    id: `usub_${Date.now()}`,
                    userId,
                    subscriptionId,
                    status: 'active',
                    currentPeriodStart: new Date(),
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days later
                };
                setUserSubscription(newSubscription);
            }
        } catch (error) {
            console.error('Error changing subscription plan:', error);
        } finally {
            setIsChangingPlan(false);
        }
    };

    const currentSubscriptionId = userSubscription?.subscriptionId;

    return (
        <div className="flex-1 overflow-y-auto">
            <Header title="Billing & Subscription" />
            <main className="container mx-auto px-4 py-6">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Subscription Plans</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {subscriptions.map((subscription) => (
                                            <PlanCard
                                                key={subscription.id}
                                                subscription={subscription}
                                                currentPlan={subscription.id === currentSubscriptionId}
                                                onSelectPlan={handleSelectPlan}
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            {userSubscription ? (
                                <SubscriptionDetails subscription={userSubscription} />
                            ) : (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>No Active Subscription</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-secondary-600">
                                            You dont have an active subscription. Please select a plan to get started.
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}