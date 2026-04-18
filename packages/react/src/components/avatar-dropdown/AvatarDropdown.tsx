import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AvatarDropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const AvatarDropdownItem = ({ className, children, ...props }: AvatarDropdownItemProps) => (
    <div className={cn('avatar-dropdown-item', className)} {...props}>
        {children}
    </div>
);

export interface AvatarDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    trigger: React.ReactNode;
    disabled?: boolean;
}

const AvatarDropdown = React.forwardRef<HTMLDivElement, AvatarDropdownProps>(
    ({ className, trigger, disabled, children, ...props }, ref) => {
        const [isOpen, setIsOpen] = React.useState(false);
        const dropdownRef = React.useRef<HTMLDivElement>(null);

        React.useImperativeHandle(ref, () => dropdownRef.current as HTMLDivElement);

        // Close on click outside
        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        return (
            <div
                ref={dropdownRef}
                className={cn(
                    'avatar-dropdown',
                    disabled && 'avatar-dropdown--disabled',
                    className
                )}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        !disabled && setIsOpen(!isOpen);
                    }
                    if (e.key === 'Escape') {
                        setIsOpen(false);
                    }
                }}
                {...props}
            >
                <div className="avatar-dropdown__trigger">
                    {trigger}
                    <div className="avatar-dropdown__icon">
                        <ChevronDown size={16} />
                    </div>
                </div>
                
                <div className={cn(
                    'avatar-dropdown-menu',
                    isOpen && 'avatar-dropdown-menu--open'
                )}>
                    {children}
                </div>
            </div>
        );
    }
);

AvatarDropdown.displayName = 'AvatarDropdown';

export { AvatarDropdown, AvatarDropdownItem };
