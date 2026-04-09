import * as React from 'react';
import { cn } from '../../lib/utils';
import { useFormField } from './FormField';

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
    ({ className, ...props }, ref) => {
        const { id } = useFormField();

        return (
            <label
                ref={ref}
                className={cn('form-label', className)}
                htmlFor={id}
                {...props}
            />
        );
    }
);
FormLabel.displayName = 'FormLabel';

export { FormLabel };
