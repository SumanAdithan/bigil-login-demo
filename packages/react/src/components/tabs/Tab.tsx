import * as React from 'react';
import { cn } from '../../lib/utils';
import { TabsContext } from './Tabs';

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  badge?: string | number;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, value, children, iconLeft, iconRight, badge, onClick, disabled, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) {
      throw new Error('Tab must be used within a Tabs component');
    }

    const isSelected = context.value === value;
    const isDisabled = disabled;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
      context.onValueChange?.(value);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        tabIndex={isSelected ? 0 : -1}
        disabled={isDisabled}
        className={cn(
          'bl-tab',
          `bl-tab--${context.orientation}`,
          `bl-tab--${context.size}`,
          `bl-tab--${context.variant}`,
          isSelected && 'is-selected',
          isDisabled && 'is-disabled',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {iconLeft && <span className="bl-tab-icon bl-tab-icon--left">{iconLeft}</span>}
        {children}
        {badge !== undefined && <span className="bl-tab-badge">{badge}</span>}
        {iconRight && <span className="bl-tab-icon bl-tab-icon--right">{iconRight}</span>}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

export { Tab };
