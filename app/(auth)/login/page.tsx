// import { LoginForm } from '@/components/auth/login-form';
// import { Metadata } from 'next';
//
// export const metadata: Metadata = {
//     title: 'Login | SaaSApp',
//     description: 'Login to your SaaSApp account',
// };
//
// export default function LoginPage() {
//     return <LoginForm />;
// }

// app/(auth)/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SimplifiedLoginPage() {
    const router = useRouter();

    const handleFakeLogin = () => {
        // Встановіть щось в localStorage, щоб імітувати стан входу
        localStorage.setItem('fakeAuth', 'true');
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Debug Login</h1>
                <p className="mb-4">Натисніть кнопку для тестового входу (обхід NextAuth):</p>
                <Button onClick={handleFakeLogin} className="w-full">
                    Debug Login
                </Button>
            </div>
        </div>
    );
}