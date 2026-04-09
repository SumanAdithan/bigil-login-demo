import * as React from 'react';
import { cn } from '../../lib/utils';

interface FormFieldContextValue {
    id: string;
    isError?: boolean;
    isDisabled?: boolean;
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

export function useFormField() {
    const context = React.useContext(FormFieldContext);
    if (!context) {
        throw new Error('useFormField must be used within a <FormField />');
    }
    return context;
}

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    isError?: boolean;
    isDisabled?: boolean;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
    ({ className, isError, isDisabled, children, ...props }, ref) => {
        const id = React.useId();

        const contextValue = React.useMemo(
            () => ({ id, isError, isDisabled }),
            [id, isError, isDisabled]
        );

        return (
            <FormFieldContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cn(
                        'form-field',
                        isError && 'is-error',
                        isDisabled && 'is-disabled',
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </FormFieldContext.Provider>
        );
    }
);
FormField.displayName = 'FormField';

export { FormField, FormFieldContext };
