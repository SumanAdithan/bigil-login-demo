import * as React from 'react';
import { cn } from '../../lib/utils';

interface TileGroupContextValue {
    value?: string;
    onValueChange?: (value: string) => void;
}

const TileGroupContext = React.createContext<TileGroupContextValue | null>(null);

export const useTileGroup = () => React.useContext(TileGroupContext);

export interface TileGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
}

const TileGroup = React.forwardRef<HTMLDivElement, TileGroupProps>(
    ({ className, value: propValue, onValueChange, defaultValue, children, ...props }, ref) => {
        const [valueState, setValueState] = React.useState(defaultValue);
        
        const isControlled = propValue !== undefined;
        const activeValue = isControlled ? propValue : valueState;

        const handleValueChange = React.useCallback(
            (newValue: string) => {
                if (!isControlled) {
                    setValueState(newValue);
                }
                onValueChange?.(newValue);
            },
            [isControlled, onValueChange]
        );

        const contextValue = React.useMemo(() => ({
            value: activeValue,
            onValueChange: handleValueChange
        }), [activeValue, handleValueChange]);

        return (
            <TileGroupContext.Provider value={contextValue}>
                <div 
                    ref={ref} 
                    className={cn('tile-group', className)} 
                    data-tile-group 
                    {...props} 
                >
                    {children}
                </div>
            </TileGroupContext.Provider>
        );
    }
);
TileGroup.displayName = 'TileGroup';

export { TileGroup };
