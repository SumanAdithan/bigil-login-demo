import * as React from 'react';
import { cn } from '../../lib/utils';
import { useFormField } from './FormField';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
    ({ className, ...props }, ref) => {
        const { id, isError, isDisabled } = useFormField();

        return (
            <div className='form-input-wrapper'>
                <input
                    id={id}
                    ref={ref}
                    disabled={isDisabled}
                    className={cn(
                        'form-input', 
                        isError && 'is-error',
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);
FormInput.displayName = 'FormInput';

export { FormInput };
