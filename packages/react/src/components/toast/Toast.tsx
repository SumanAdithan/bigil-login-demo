import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const toastVariants = cva('toast', {
    variants: {
        variant: {
            danger: 'toast-danger',
            info: 'toast-info',
            warning: 'toast-warning',
            success: 'toast-success',
            neutral: 'toast-neutral',
        },
    },
    defaultVariants: {
        variant: 'neutral',
    },
});

export interface ToastProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof toastVariants> {}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(toastVariants({ variant, className }))}
                {...props}
            />
        );
    }
);
Toast.displayName = 'Toast';

const ToastBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('toast-body', className)} {...props} />
    )
);
ToastBody.displayName = 'ToastBody';

const ToastIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('toast-icon', className)} {...props} />
    )
);
ToastIcon.displayName = 'ToastIcon';

const ToastContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('toast-content', className)} {...props} />
    )
);
ToastContent.displayName = 'ToastContent';

const ToastTitle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ className, ...props }, ref) => (
        <span ref={ref} className={cn('toast-title', className)} {...props} />
    )
);
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ className, ...props }, ref) => (
        <span ref={ref} className={cn('toast-description', className)} {...props} />
    )
);
ToastDescription.displayName = 'ToastDescription';

const ToastAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, ...props }, ref) => (
        <button ref={ref} className={cn('toast-action', className)} {...props} />
    )
);
ToastAction.displayName = 'ToastAction';

const ToastClose = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('toast-close', className)} {...props} />
    )
);
ToastClose.displayName = 'ToastClose';

export {
    Toast,
    ToastBody,
    ToastIcon,
    ToastContent,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastClose,
    toastVariants,
};
