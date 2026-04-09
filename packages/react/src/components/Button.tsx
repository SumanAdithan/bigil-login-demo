import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
    'btn', // Base Atlas class
    {
        variants: {
            variant: {
                primary: 'btn-primary',
                primaryDestructive: 'btn-primary-destructive',
                secondary: 'btn-secondary',
                secondaryGray: 'btn-secondary-gray',
                secondaryDestructive: 'btn-secondary-destructive',
                tertiary: 'btn-tertiary',
                tertiaryGray: 'btn-tertiary-gray',
                tertiaryDestructive: 'btn-tertiary-destructive',
                link: 'btn-link',
                linkGray: 'btn-link-gray',
                linkDestructive: 'btn-link-destructive',
                skeleton: 'btn-skeleton',
            },
            size: {
                sm: 'btn-sm',
                md: 'btn-md',
                lg: 'btn-lg',
                xl: 'btn-xl',
            },
            fullWidth: {
                true: 'btn-block',
            },
            loading: {
                true: 'btn-loading',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, loading, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, fullWidth, loading, className }))}
                ref={ref}
                disabled={loading || props.disabled}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
