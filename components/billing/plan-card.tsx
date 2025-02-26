import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Subscription } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { FiCheck } from 'react-icons/fi';

interface PlanCardProps {
    subscription: Subscription;
    currentPlan: boolean;
    onSelectPlan: (id: string) => void;
}

export function PlanCard({ subscription, currentPlan, onSelectPlan }: PlanCardProps) {
    return (
        <Card
            className={`flex flex-col h-full ${
                subscription.isPopular
                    ? 'border-2 border-primary-500'
                    : 'border border-secondary-200'
            }`}
        >
            {subscription.isPopular && (
                <div className="bg-primary-500 text-white text-center py-1 text-sm font-medium">
                    Most Popular
                </div>
            )}
            <CardHeader className="pb-3">
                <CardTitle>{subscription.name}</CardTitle>
                <p className="text-secondary-500 text-sm mt-1">
                    {subscription.description}
                </p>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="mb-6">
          <span className="text-3xl font-bold">
            {formatCurrency(subscription.price)}
          </span>
                    <span className="text-secondary-500 ml-1">/month</span>
                </div>
                <ul className="space-y-3">
                    {subscription.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <FiCheck className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span className="text-secondary-700">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="pt-3">
                <Button
                    variant={currentPlan ? 'secondary' : 'primary'}
                    className="w-full"
                    onClick={() => onSelectPlan(subscription.id)}
                    disabled={currentPlan}
                >
                    {currentPlan ? 'Current Plan' : 'Select Plan'}
                </Button>
            </CardFooter>
        </Card>
    );
}
