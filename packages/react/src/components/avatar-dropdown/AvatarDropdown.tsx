import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { DropdownMenu, DropdownMenuItem } from '../dropdown-menu';
import { Avatar } from '../avatar';

export interface AvatarDropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
}

const AvatarDropdownItem = ({ className, children, ...props }: AvatarDropdownItemProps) => (
    <DropdownMenuItem className={cn('avatar-dropdown-item', className)} {...props}>
        {children}
    </DropdownMenuItem>
);

export interface AvatarDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    trigger?: React.ReactNode;
    disabled?: boolean;
    avatarUrl?: string;
    avatarName?: string;
    avatarInitials?: string;
    avatarIcon?: React.ReactNode;
    avatarSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    avatarSubtext?: React.ReactNode;
}

const AvatarDropdown = React.forwardRef<HTMLDivElement, AvatarDropdownProps>(
    ({ className, trigger, disabled, children, avatarUrl, avatarName, avatarInitials, avatarIcon, avatarSize = 'sm', avatarSubtext, tabIndex = 0, ...props }, ref) => {
        const [isOpen, setIsOpen] = React.useState(false);
        const [anchorRect, setAnchorRect] = React.useState<{ top: number; left: number; width: number } | undefined>();
        const dropdownRef = React.useRef<HTMLDivElement>(null);

        React.useImperativeHandle(ref, () => dropdownRef.current as HTMLDivElement);

        const updatePosition = React.useCallback(() => {
            if (dropdownRef.current) {
                const rect = dropdownRef.current.getBoundingClientRect();
                setAnchorRect({
                    top: rect.bottom + 4,
                    left: rect.left,
                    width: rect.width
                });
            }
        }, []);

        React.useEffect(() => {
            if (isOpen) {
                updatePosition();
                window.addEventListener('scroll', updatePosition, true);
                window.addEventListener('resize', updatePosition);
            }
            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }, [isOpen, updatePosition]);

        const toggleOpen = () => {
            if (!disabled) {
                setIsOpen(prev => !prev);
            }
        };

        return (
            <div
                ref={dropdownRef}
                className={cn(
                    'avatar-dropdown',
                    disabled && 'avatar-dropdown--disabled',
                    className
                )}
                tabIndex={disabled ? -1 : tabIndex}
                onClick={toggleOpen}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleOpen();
                    }
                    if (e.key === 'Escape') {
                        setIsOpen(false);
                    }
                }}
                aria-expanded={isOpen}
                aria-haspopup="true"
                {...props}
            >
                <div className="avatar-dropdown__trigger">
                    {trigger || (
                        <Avatar
                            size={avatarSize}
                            src={avatarUrl}
                            name={avatarName}
                            initials={avatarInitials}
                            icon={avatarIcon}
                            className="avatar-label__avatar"
                        />
                    )}
                    {(avatarName || avatarSubtext) && !trigger && (
                        <div className="avatar-dropdown__info">
                            {avatarName && <span className="avatar-dropdown__name">{avatarName}</span>}
                            {avatarSubtext && <span className="avatar-dropdown__subtext">{avatarSubtext}</span>}
                        </div>
                    )}
                    <div className="avatar-dropdown__icon">
                        <ChevronDown size={16} />
                    </div>
                </div>

                <DropdownMenu
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    anchorRect={anchorRect}
                >
                    {children}
                </DropdownMenu>
            </div>
        );
    }
);

AvatarDropdown.displayName = 'AvatarDropdown';

export { AvatarDropdown, AvatarDropdownItem };
