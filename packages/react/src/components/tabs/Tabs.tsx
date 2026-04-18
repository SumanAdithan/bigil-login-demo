import * as React from 'react';
import { cn } from '../../lib/utils';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsSize = 'small' | 'medium';
export type TabsVariant = 'primary' | 'secondary';

export interface TabsContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  orientation: TabsOrientation;
  size: TabsSize;
  variant: TabsVariant;
}

export const TabsContext = React.createContext<TabsContextValue | null>(null);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  size?: TabsSize;
  variant?: TabsVariant;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      value,
      onValueChange,
      orientation = 'horizontal',
      size = 'medium',
      variant = 'primary',
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo(
      () => ({ value, onValueChange, orientation, size, variant }),
      [value, onValueChange, orientation, size, variant]
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="tablist"
          aria-orientation={orientation}
          className={cn(
            'bl-tabs-list',
            `bl-tabs-list--${orientation}`,
            `bl-tabs-list--${size}`,
            className
          )}
          {...props}
        />
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

export { Tabs };
