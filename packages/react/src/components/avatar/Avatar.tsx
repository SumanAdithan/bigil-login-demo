import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { clsx } from 'clsx';

const avatarVariants = cva(
    'avatar',
    {
        variants: {
            size: {
                xs: 'avatar-xs',
                sm: 'avatar-sm',
                md: 'avatar-md',
                lg: 'avatar-lg',
                xl: 'avatar-xl',
            },
            type: {
                image: '',
                text: 'avatar-text',
                icon: 'avatar-user',
                skeleton: 'avatar-skeleton',
            }
        },
        defaultVariants: {
            size: 'md',
            type: 'image',
        },
    }
);

const statusVariants = cva(
    'avatar-status',
    {
        variants: {
            size: {
                xs: 'avatar-status-xs',
                sm: 'avatar-status-sm',
                md: 'avatar-status-md',
                lg: 'avatar-status-lg',
                xl: 'avatar-status-xl',
            }
        },
        defaultVariants: {
            size: 'md',
        }
    }
);

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export interface AvatarProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof avatarVariants> {
    src?: string;
    alt?: string;
    name?: string;
    initials?: string;
    icon?: React.ReactNode;
    showStatus?: boolean;
    statusColor?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, size, type, src, alt, name, initials, icon, showStatus, statusColor, children, ...props }, ref) => {
        const renderContent = () => {
            if (children) return children;
            if (src) return <img src={src} alt={alt || name || 'Avatar'} />;
            if (initials || name) return initials || (name ? getInitials(name) : '');
            if (icon) return icon;
            return null;
        };

        const resolvedType = React.useMemo(() => {
            if (type) return type;
            if (src) return 'image';
            if (initials || name) return 'text';
            if (icon) return 'icon';
            return 'image';
        }, [type, src, initials, name, icon]);

        return (
            <div
                ref={ref}
                className={clsx(
                    'avatar',
                    size && `avatar-${size}`,
                    resolvedType && resolvedType !== 'image' && `avatar-${resolvedType}`,
                    className
                )}
                {...props}
            >
                {renderContent()}
                {showStatus && (
                    <div 
                        className={cn(statusVariants({ size }))} 
                        style={statusColor ? { backgroundColor: statusColor } : undefined}
                    />
                )}
            </div>
        );
    }
);

Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: VariantProps<typeof avatarVariants>['size'];
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
    ({ className, size = 'md', children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'avatar-group',
                    size && `avatar-group-${size}`,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarGroup, avatarVariants };
