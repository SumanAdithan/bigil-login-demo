import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useTileGroup } from './TileGroup';

const tileVariants = cva(
    'tile', // Base Atlas class
    {
        variants: {
            selected: {
                true: 'tile-selected',
            },
            disabled: {
                true: 'tile-disabled',
            },
        },
        defaultVariants: {
            selected: false,
            disabled: false,
        },
    }
);

// We omit 'disabled' from the native button attributes because CVA provides its own 'disabled' variant prop
export interface TileProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'value'>,
        VariantProps<typeof tileVariants> {
    asChild?: boolean;
    value?: string;
    disabled?: boolean;
}

const Tile = React.forwardRef<HTMLButtonElement, TileProps>(
    ({ className, selected: propSelected, disabled, asChild = false, value, onClick, ...props }, ref) => {
        const group = useTileGroup();
        
        // If nested in a group, the group manages the 'selected' state
        const isSelected = React.useMemo(() => {
            if (group) {
                return group.value === value;
            }
            return !!propSelected;
        }, [group, value, propSelected]);
        
        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled) {
                e.preventDefault();
                return;
            }
            
            if (group && value) {
                group.onValueChange?.(value);
            }
            
            onClick?.(e);
        };

        const Comp = asChild ? Slot : 'button';
        
        return (
            <Comp
                className={cn(tileVariants({ selected: isSelected, disabled: !!disabled, className }))}
                ref={ref}
                disabled={disabled}
                aria-pressed={isSelected}
                onClick={handleClick}
                {...(props as any)}
            />
        );
    }
);
Tile.displayName = 'Tile';

export { Tile, tileVariants };
