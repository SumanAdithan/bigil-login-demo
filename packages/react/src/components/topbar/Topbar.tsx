import * as React from 'react';
import { Bell, User, ChevronDown, Briefcase } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
    loading?: boolean;
}

const Topbar = React.forwardRef<HTMLElement, TopbarProps>(
    ({ className, loading, children, ...props }, ref) => {
        return (
            <header
                ref={ref}
                className={cn('topbar', loading && 'topbar--loading', className)}
                {...props}
            >
                {children}
            </header>
        );
    }
);
Topbar.displayName = 'Topbar';

const TopbarLeft = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('topbar-container topbar-left', className)} {...props}>
        {children}
    </div>
);

const TopbarCenter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('topbar-container topbar-center', className)} {...props}>
        {children}
    </div>
);

const TopbarRight = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('topbar-container topbar-right', className)} {...props}>
        {children}
    </div>
);

const TopbarLogo = ({ className, src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img className={cn('topbar-logo', className)} src={src} alt={alt || 'Logo'} {...props} />
);

const TopbarDashboardButton = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button className={cn('topbar-btn--dashboard', className)} {...props}>
        {children}
    </button>
);

const TopbarNotification = ({ className, hasDot = true, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { hasDot?: boolean }) => (
    <div className={cn('topbar-notification', className)} {...props}>
        {children || <Bell size={20} />}
        {hasDot && <div className="topbar-notification__dot" />}
    </div>
);

const TopbarHeaderDropdown = ({ 
    className, 
    userName, 
    userId, 
    icon = <User size={18} />, 
    isOpen, 
    onClick,
    children,
    ...props 
}: React.HTMLAttributes<HTMLDivElement> & { 
    userName: string; 
    userId: string; 
    icon?: React.ReactNode;
    isOpen?: boolean;
}) => (
    <div className={cn('topbar-header-dropdown', className)} onClick={onClick} {...props}>
        <div className="topbar-user-icon-wrapper">
            {icon}
        </div>
        <div className="topbar-user-info">
            <span className="topbar-user-name">{userName}</span>
            <span className="topbar-user-id">{userId}</span>
        </div>
        <ChevronDown size={16} />
        {children}
    </div>
);

const TopbarRMCard = ({ 
    className, 
    title, 
    subtitle, 
    icon = <Briefcase size={18} />, 
    ...props 
}: React.HTMLAttributes<HTMLDivElement> & { 
    title: string; 
    subtitle: string; 
    icon?: React.ReactNode;
}) => (
    <div className={cn('topbar-rm-card', className)} {...props}>
        <div className="topbar-rm-icon-wrapper">
            {icon}
        </div>
        <div className="topbar-rm-info">
            <span className="topbar-rm-title">{title}</span>
            <span className="topbar-rm-subtitle">{subtitle}</span>
        </div>
    </div>
);

export { 
    Topbar, 
    TopbarLeft, 
    TopbarCenter, 
    TopbarRight, 
    TopbarLogo, 
    TopbarDashboardButton, 
    TopbarNotification,
    TopbarHeaderDropdown,
    TopbarRMCard
};
