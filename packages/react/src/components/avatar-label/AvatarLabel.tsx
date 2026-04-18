import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const avatarLabelVariants = cva(
    'avatar-label',
    {
        variants: {
            variant: {
                default: '',
                boxed: 'avatar-label--boxed',
            },
            size: {
                sm: 'avatar-label--sm',
                md: 'avatar-label--md',
                lg: 'avatar-label--lg',
                xl: 'avatar-label--xl',
            },
            loading: {
                true: 'avatar-label--loading',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
            loading: false,
        },
    }
);

export interface AvatarLabelProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof avatarLabelVariants> {
    asChild?: boolean;
    avatarUrl?: string;
    text?: React.ReactNode;
    subtext?: React.ReactNode;
    showStatus?: boolean;
    statusColor?: string;
}

const AvatarLabel = React.forwardRef<HTMLDivElement, AvatarLabelProps>(
    ({ className, size, variant, loading, avatarUrl, text, subtext, showStatus = false, statusColor, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'div';
        
        return (
            <Comp
                className={cn(avatarLabelVariants({ size, variant, loading, className }))}
                ref={ref}
                {...props}
            >
                <div className="avatar-label__avatar-wrapper">
                    {avatarUrl && (
                        <img 
                            src={avatarUrl} 
                            alt={typeof text === 'string' ? text : 'Avatar'} 
                            className="avatar-label__avatar" 
                        />
                    )}
                    {showStatus && (
                        <div 
                            className="avatar-label__status" 
                            style={statusColor ? { backgroundColor: statusColor } : undefined}
                        />
                    )}
                </div>
                {(text || subtext) && (
                    <div className="avatar-label__info">
                        {text && <span className="avatar-label__text">{text}</span>}
                        {subtext && <span className="avatar-label__subtext">{subtext}</span>}
                    </div>
                )}
            </Comp>
        );
    }
);

AvatarLabel.displayName = 'AvatarLabel';

export { AvatarLabel, avatarLabelVariants };
