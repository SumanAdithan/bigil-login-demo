import * as React from 'react';
import { cn } from '../../lib/utils';

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    supportText?: React.ReactNode;
    selected?: boolean;
    variant?: 'single' | 'checkbox';
}

const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
    ({ className, icon, supportText, selected, variant = 'single', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                className={cn(
                    'dropdown-menu-item',
                    selected && variant === 'single' && 'dropdown-menu-item--selected-single',
                    selected && variant === 'checkbox' && 'dropdown-menu-item--selected-checkbox',
                    className
                )}
                {...props}
            >
                {icon && <span className="dropdown-menu-item__icon">{icon}</span>}
                <div className="dropdown-menu-item__content">
                    <span className="dropdown-menu-item__text">{children}</span>
                    {supportText && <span className="dropdown-menu-item__support-text">{supportText}</span>}
                </div>
            </button>
        );
    }
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

export { DropdownMenuItem };
