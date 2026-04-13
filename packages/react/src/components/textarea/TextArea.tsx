import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    error?: boolean | string;
    textareaClassName?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ label, helperText, error, className, textareaClassName, disabled, id, ...props }, ref) => {
        const generatedId = React.useId();
        const textareaId = id || generatedId;
        const isError = !!error;
        const errorMessage = typeof error === 'string' ? error : undefined;

        return (
            <div className={cn('flex flex-col gap-1 w-full', className)}>
                {label && (
                    <label 
                        htmlFor={textareaId} 
                        className="textarea-label"
                    >
                        {label}
                    </label>
                )}
                
                <textarea
                    ref={ref}
                    id={textareaId}
                    disabled={disabled}
                    className={cn(
                        'textarea',
                        isError && 'textarea-error',
                        textareaClassName
                    )}
                    {...props}
                />

                {(errorMessage || helperText) && (
                    <span 
                        className={cn(
                            'textarea-helper',
                            isError && 'textarea-helper-error'
                        )}
                    >
                        {isError ? (errorMessage || helperText) : helperText}
                    </span>
                )}
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';

export { TextArea };
