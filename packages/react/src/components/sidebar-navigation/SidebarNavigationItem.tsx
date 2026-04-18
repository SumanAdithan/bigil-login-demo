import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const sidebarNavigationItemVariants = cva(
    'sidebar-item',
    {
        variants: {
            selected: {
                true: 'is-selected',
            },
            footer: {
                true: 'footer-item',
            },
        },
        defaultVariants: {
            selected: false,
            footer: false,
        },
    }
);

export interface SidebarNavigationItemProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
        VariantProps<typeof sidebarNavigationItemVariants> {
    asChild?: boolean;
    icon?: React.ReactNode;
    label?: React.ReactNode;
    backgroundImage?: string;
}

const SidebarNavigationItem = React.forwardRef<HTMLAnchorElement, SidebarNavigationItemProps>(
    ({ className, selected, footer, icon, label, backgroundImage, asChild = false, style, ...props }, ref) => {
        const Comp = asChild ? Slot : 'a';
        
        return (
            <Comp
                className={cn(
                    sidebarNavigationItemVariants({ selected, footer, className }),
                    footer && backgroundImage && 'has-bg'
                )}
                ref={ref}
                style={{
                    ...style,
                    ...(footer && backgroundImage ? { 
                        backgroundImage: `url(${backgroundImage})`,
                        padding: 'var(--space-3)'
                    } : {}),
                }}
                {...props}
            >
                {(!backgroundImage || !footer) && icon && <div className="sidebar-item-icon">{icon}</div>}
                {(!backgroundImage || !footer) && label && <span className="sidebar-item-label">{label}</span>}
            </Comp>
        );
    }
);

SidebarNavigationItem.displayName = 'SidebarNavigationItem';

export { SidebarNavigationItem, sidebarNavigationItemVariants };
