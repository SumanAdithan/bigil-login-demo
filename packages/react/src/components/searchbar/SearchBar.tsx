import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onClear?: () => void;
    error?: boolean;
    helperText?: string;
    icon?: React.ReactNode;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
    ({ className, onClear, error, helperText, icon, disabled, value, ...props }, ref) => {
        const hasValue = value && String(value).length > 0;

        return (
            <div className="w-full">
                <div
                    className={cn(
                        'searchbar',
                        disabled && 'disabled',
                        error && 'error',
                        hasValue && 'filled',
                        className
                    )}
                >
                    <div className="searchbar-icon">
                        {icon || <Search size={18} />}
                    </div>
                    <input
                        ref={ref}
                        className="searchbar-input"
                        disabled={disabled}
                        value={value}
                        {...props}
                    />
                    {hasValue && !disabled && (
                        <div className="searchbar-clear" onClick={onClear}>
                            <X size={18} />
                        </div>
                    )}
                </div>
                {helperText && (
                    <div className={cn('search-helper', error && 'error')}>
                        {helperText}
                    </div>
                )}
            </div>
        );
    }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };
