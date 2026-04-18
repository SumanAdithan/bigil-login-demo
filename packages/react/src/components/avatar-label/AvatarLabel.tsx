import * as React from 'react';
import { cn } from '../../lib/utils';
import { Avatar } from '../avatar';

export interface AvatarLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'boxed';
    loading?: boolean;
    avatarUrl?: string;
    text?: React.ReactNode;
    subtext?: React.ReactNode;
    showStatus?: boolean;
    statusColor?: string;
    name?: string;
    initials?: string;
    avatarIcon?: React.ReactNode;
}

const AvatarLabel = React.forwardRef<HTMLDivElement, AvatarLabelProps>(
    ({
        className,
        size = 'md',
        variant = 'default',
        loading = false,
        avatarUrl,
        text,
        subtext,
        showStatus = false,
        statusColor,
        name,
        initials,
        avatarIcon,
        tabIndex = 0,
        ...props
    }, ref) => {
        return (
            <div
                ref={ref}
                tabIndex={tabIndex}
                className={cn(
                    'avatar-label',
                    `avatar-label--${size}`,
                    variant === 'boxed' && 'avatar-label--boxed',
                    loading && 'avatar-label--loading',
                    className
                )}
                {...props}
            >
                <div className="avatar-label__avatar-wrapper">
                    <Avatar
                        src={avatarUrl}
                        name={name || (typeof text === 'string' ? text : undefined)}
                        initials={initials}
                        icon={avatarIcon}
                        showStatus={showStatus}
                        statusColor={statusColor}
                        type={loading ? 'skeleton' : undefined}
                        className="avatar-label__avatar"
                    />
                </div>
                {(text || subtext) && (
                    <div className="avatar-label__info">
                        {text && <span className="avatar-label__text">{text}</span>}
                        {subtext && <span className="avatar-label__subtext">{subtext}</span>}
                    </div>
                )}
            </div>
        );
    }
);

AvatarLabel.displayName = 'AvatarLabel';

export { AvatarLabel };
