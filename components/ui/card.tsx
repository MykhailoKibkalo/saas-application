import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverable = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'bg-white rounded-lg shadow-md overflow-hidden',
                    {
                        'transition-shadow hover:shadow-lg': hoverable,
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn('px-6 py-4 border-b border-secondary-100', className)}
            {...props}
        />
    );
});

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<
    HTMLHeadingElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
    return (
        <h3
            ref={ref}
            className={cn('font-semibold text-lg text-secondary-900', className)}
            {...props}
        />
    );
});

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    return (
        <p
            ref={ref}
            className={cn('text-sm text-secondary-500', className)}
            {...props}
        />
    );
});

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div ref={ref} className={cn('px-6 py-4', className)} {...props} />
    );
});

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn('px-6 py-4 border-t border-secondary-100', className)}
            {...props}
        />
    );
});

CardFooter.displayName = 'CardFooter';