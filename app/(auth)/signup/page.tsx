import { SignupForm } from '@/components/auth/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up | SaaSApp',
    description: 'Create a new SaaSApp account',
};

export default function SignupPage() {
    return <SignupForm />;
}