import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
    'card',
    {
        variants: {
            variant: {
                horizontal: 'card-horizontal',
                vertical: 'card-vertical',
            },
            selected: {
                true: 'card-selected',
            },
            disabled: {
                true: 'card-disabled',
            },
        },
        defaultVariants: {
            variant: 'horizontal',
            selected: false,
            disabled: false,
        },
    }
);

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardVariants> {
    asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, selected, disabled, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'div';
        
        return (
            <Comp
                className={cn(cardVariants({ variant, selected, disabled, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Card.displayName = 'Card';

export { Card, cardVariants };
