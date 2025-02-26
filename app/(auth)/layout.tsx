import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-primary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link
                    href="/"
                    className="flex items-center text-primary-600 hover:text-primary-700 mb-6 text-sm mx-auto w-fit"
                >
                    <FiArrowLeft className="mr-2" /> Back to Home
                </Link>
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary-600">SaaSApp</h2>
                    <p className="mt-2 text-secondary-600">
                        Your complete business solution
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {children}
                </div>
            </div>
        </div>
    );
}