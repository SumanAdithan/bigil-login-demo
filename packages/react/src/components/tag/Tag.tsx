import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const tagVariants = cva(
    'atlas-tag',
    {
        variants: {
            size: {
                sm: 'atlas-tag--size-sm',
                md: 'atlas-tag--size-md',
            },
            shape: {
                rounded: 'atlas-tag--shape-rounded',
                rectangle: 'atlas-tag--shape-rectangle',
            },
            selected: {
                true: 'atlas-tag--selected',
            }
        },
        defaultVariants: {
            size: 'md',
            shape: 'rounded',
            selected: false,
        },
    }
);

export interface TagProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof tagVariants> {
    asChild?: boolean;
    onRemove?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const Tag = React.forwardRef<HTMLButtonElement, TagProps>(
    ({ className, size, shape, selected, disabled, asChild = false, onRemove, children, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        
        const handleRemove = (e: React.MouseEvent<HTMLSpanElement>) => {
            e.stopPropagation();
            onRemove?.(e);
        };

        return (
            <Comp
                className={cn(tagVariants({ size, shape, selected, className }), { 'atlas-tag--disabled': disabled })}
                ref={ref}
                disabled={disabled}
                aria-selected={selected ?? undefined}
                {...props}
            >
                {children}
                {onRemove && (
                    <span 
                        className="atlas-tag__icon" 
                        onClick={handleRemove}
                        role="button"
                        aria-label="Remove"
                    >
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </span>
                )}
            </Comp>
        );
    }
);
Tag.displayName = 'Tag';

export { Tag, tagVariants };
