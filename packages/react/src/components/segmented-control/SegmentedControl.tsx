import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const segmentedControlVariants = cva(
    'segmented-control',
    {
        variants: {
            size: {
                sm: 'segmented-control-sm',
                md: 'segmented-control-md',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
);

interface SegmentedControlContextValue {
    value?: string;
    onValueChange?: (value: string) => void;
}

const SegmentedControlContext = React.createContext<SegmentedControlContextValue>({});

export interface SegmentedControlProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof segmentedControlVariants> {
    value?: string;
    onValueChange?: (value: string) => void;
}

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
    ({ className, size, value, onValueChange, children, ...props }, ref) => {
        const contextValue = React.useMemo(
            () => ({ value, onValueChange }),
            [value, onValueChange]
        );

        return (
            <SegmentedControlContext.Provider value={contextValue}>
                <div
                    className={cn(segmentedControlVariants({ size, className }))}
                    ref={ref}
                    role="tablist"
                    {...props}
                >
                    {children}
                </div>
            </SegmentedControlContext.Provider>
        );
    }
);
SegmentedControl.displayName = 'SegmentedControl';

export { SegmentedControl, SegmentedControlContext };
