import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';
import { SegmentedControlContext } from './SegmentedControl';

export interface SegmentedControlItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    asChild?: boolean;
}

const SegmentedControlItem = React.forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
    ({ className, value, asChild = false, onClick, ...props }, ref) => {
        const context = React.useContext(SegmentedControlContext);
        const isSelected = context.value === value;
        const Comp = asChild ? Slot : 'button';

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            context.onValueChange?.(value);
        };

        return (
            <Comp
                className={cn(
                    'segment-item', 
                    isSelected && 'segment-item-selected',
                    className
                )}
                ref={ref}
                role="tab"
                aria-selected={isSelected}
                onClick={handleClick}
                {...props}
            />
        );
    }
);
SegmentedControlItem.displayName = 'SegmentedControlItem';

export { SegmentedControlItem };
