import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onClose: () => void;
    anchorRect?: { top: number; left: number; width: number };
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
    ({ className, isOpen, onClose, anchorRect, children, style, ...props }, ref) => {
        const menuRef = React.useRef<HTMLDivElement>(null);

        React.useImperativeHandle(ref, () => menuRef.current as HTMLDivElement);

        // Handle clicks outside
        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                    onClose();
                }
            };

            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
            }
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, [isOpen, onClose]);

        if (!isOpen) return null;

        const menuStyle: React.CSSProperties = {
            ...style,
            ...(anchorRect ? {
                top: anchorRect.top,
                left: anchorRect.left,
                width: anchorRect.width,
            } : {})
        };

        return createPortal(
            <div
                ref={menuRef}
                className={cn('dropdown-menu dropdown-menu--open', className)}
                style={menuStyle}
                {...props}
            >
                {children}
            </div>,
            document.body
        );
    }
);

DropdownMenu.displayName = 'DropdownMenu';

export { DropdownMenu };
