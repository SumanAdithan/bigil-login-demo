import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const badgeVariants = cva(
    'badge',
    {
        variants: {
            variant: {
                solid: 'badge-solid',
                light: 'badge-light',
            },
            size: {
                sm: 'badge-sm',
                lg: 'badge-lg',
            },
            color: {
                red: 'badge-red',
                amber: 'badge-amber',
                lime: 'badge-lime',
                blue: 'badge-blue',
                neutral: 'badge-neutral',
                brand: 'badge-brand',
                indigo: 'badge-indigo',
                emerald: 'badge-emerald',
                teal: 'badge-teal',
                orange: 'badge-orange',
                pink: 'badge-pink',
                violet: 'badge-violet',
                rose: 'badge-rose',
            },
        },
        defaultVariants: {
            variant: 'solid',
            size: 'lg',
            color: 'neutral',
        },
    }
);

export interface BadgeProps
    extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
        VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant, size, color, ...props }, ref) => {
        return (
            <span
                className={cn(badgeVariants({ variant, size, color, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
