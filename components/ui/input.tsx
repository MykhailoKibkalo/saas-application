import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={cn(
                        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2',
                        {
                            'border-red-300 focus:ring-red-500 focus:border-red-500': error,
                            'border-secondary-300 focus:ring-primary-500 focus:border-primary-500': !error,
                        },
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';