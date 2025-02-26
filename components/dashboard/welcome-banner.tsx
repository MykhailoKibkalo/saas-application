import { Button } from '@/components/ui/button';
import { FiArrowRight } from 'react-icons/fi';

interface WelcomeBannerProps {
    userName: string;
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
    return (
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
                    <p className="mt-1 text-primary-100">
                        Here's what's happening with your projects today.
                    </p>
                </div>
                <Button
                    className="mt-4 md:mt-0 bg-white text-primary-700 hover:bg-primary-50"
                >
                    View Reports <FiArrowRight className="ml-2" />
                </Button>
            </div>
        </div>
    );
}