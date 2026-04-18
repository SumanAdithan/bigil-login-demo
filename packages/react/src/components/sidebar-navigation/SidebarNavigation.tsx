import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';

export interface SidebarNavigationProps extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean;
}

const SidebarNavigation = React.forwardRef<HTMLElement, SidebarNavigationProps>(
    ({ className, asChild = false, children, style, ...props }, ref) => {
        const Comp = asChild ? Slot : 'nav';
        
        const contentItems: React.ReactNode[] = [];
        const footerItems: React.ReactNode[] = [];

        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child)) {
                // @ts-ignore - access props safely
                if (child.props.footer) {
                    footerItems.push(child);
                } else {
                    contentItems.push(child);
                }
            } else {
                contentItems.push(child);
            }
        });

        return (
            <Comp
                className={cn('sidebar-nav', className)}
                ref={ref}
                style={{
                    backgroundColor: 'var(--color-blue-900)',
                    ...style
                }}
                {...props}
            >
                <div className="sidebar-nav-content">
                    {contentItems}
                </div>
                {footerItems.length > 0 && (
                    <div className="sidebar-nav-footer">
                        {footerItems}
                    </div>
                )}
            </Comp>
        );
    }
);

SidebarNavigation.displayName = 'SidebarNavigation';

export { SidebarNavigation };
