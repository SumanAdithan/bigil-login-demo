import * as React from 'react';
import { cn } from '../../lib/utils';
import { useFormField } from './FormField';

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
    ({ className, children, ...props }, ref) => {
        const { isError } = useFormField();
        const body = isError ? children : children; // Logic for error vs hint can be expanded

        if (!children) return null;

        return (
            <p
                ref={ref}
                className={cn(
                    isError ? 'form-error' : 'form-hint',
                    className
                )}
                {...props}
            >
                {body}
            </p>
        );
    }
);
FormMessage.displayName = 'FormMessage';

export { FormMessage };
