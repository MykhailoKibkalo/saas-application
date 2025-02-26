import { cn } from '@/lib/utils';
import { forwardRef, SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
    label?: string;
    options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, error, label, options, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                        {label}
                    </label>
                )}
                <select
                    className={cn(
                        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-white',
                        {
                            'border-red-300 focus:ring-red-500 focus:border-red-500': error,
                            'border-secondary-300 focus:ring-primary-500 focus:border-primary-500': !error,
                        },
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);

Select.displayName = 'Select';