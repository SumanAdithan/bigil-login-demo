import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onClear?: () => void;
    error?: boolean;
    helperText?: string;
    icon?: React.ReactNode;
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
    /**
     * Additional classes for the searchbar container
     */
    className?: string;
    /**
     * Additional styles for the searchbar container
     */
    style?: React.CSSProperties;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
    ({ className, onClear, error, helperText, icon, disabled, value, containerClassName, containerStyle, style, ...props }, ref) => {
        const hasValue = value !== undefined && value !== null && String(value).length > 0;

        const searchBarContent = (
            <div
                className={cn(
                    'searchbar',
                    disabled && 'disabled',
                    error && 'error',
                    hasValue && 'filled',
                    className
                )}
                style={style}
            >
                <div className="searchbar-icon">
                    {icon || <Search size={20} />}
                </div>
                <input
                    ref={ref}
                    className="searchbar-input"
                    disabled={disabled}
                    value={value}
                    {...props}
                />
                {hasValue && !disabled && (
                    <div className="searchbar-clear" onClick={onClear} role="button" tabIndex={0}>
                        <X size={18} />
                    </div>
                )}
            </div>
        );

        if (helperText || containerClassName || containerStyle) {
            return (
                <div style={{ width: '100%', ...containerStyle }} className={containerClassName}>
                    {searchBarContent}
                    {helperText && (
                        <div className={cn('search-helper', error && 'error')}>
                            {helperText}
                        </div>
                    )}
                </div>
            );
        }

        return searchBarContent;
    }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };
