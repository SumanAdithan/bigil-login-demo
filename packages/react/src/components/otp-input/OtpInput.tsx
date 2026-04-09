import * as React from 'react';
// @ts-expect-error - Internal core JS package lacks type definitions
import { OtpInput as OtpInputJS } from '@atlas-ds/js';
import { cn } from '../../lib/utils';

export interface OtpInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    errorMessage?: string;
    hint?: string;
    onResend?: () => void;
    resendLabel?: string;
    maxLength?: number;
    disabled?: boolean;
}

/**
 * OtpInput - A high-fidelity React wrapper for the Atlas JS OTP implementation.
 */
const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
    (
        {
            value = '',
            onChange,
            label,
            errorMessage,
            hint,
            onResend,
            resendLabel = 'Resend OTP',
            maxLength = 6,
            disabled = false,
            className,
            ...props
        },
        ref,
    ) => {
        const containerRef = React.useRef<HTMLDivElement>(null);
        const instanceRef = React.useRef<OtpInputJS | null>(null);
        const internalRef = (ref as React.MutableRefObject<HTMLDivElement | null>) || containerRef;

        // Initialize high-fidelity JS instance
        React.useEffect(() => {
            if (internalRef.current && !instanceRef.current) {
                const instance = new OtpInputJS(internalRef.current);
                instanceRef.current = instance;

                // Priority sync: Overwrite the JS reset() with our initial React value
                if (value) {
                    instance.value = value;
                }
                instance.setError(!!errorMessage);

                // Sync internal change event to React onChange
                const handleJsChange = (val: string) => {
                    if (onChange) onChange(val);
                };

                instance.on('change', handleJsChange);

                return () => {
                    // Cleanup if necessary (though Atlas JS doesn't currently expose a destroy method)
                    instanceRef.current = null;
                };
            }
        }, [internalRef, onChange]);

        // Synchronize React state -> JS Instance
        React.useEffect(() => {
            if (instanceRef.current) {
                if (instanceRef.current.value !== value) {
                    instanceRef.current.value = value;
                }
                instanceRef.current.setError(!!errorMessage);
            }
        }, [value, errorMessage]);

        return (
            <div
                ref={internalRef}
                className={cn('otp-field', !!errorMessage && 'is-error', className)}
                {...props}
            >
                {label && <label className='otp-label'>{label}</label>}

                <div className='otp-group'>
                    {Array.from({ length: maxLength }).map((_, i) => (
                        <input
                            key={i}
                            type='text'
                            className='otp-input-box'
                            placeholder='-'
                            maxLength={1}
                            inputMode='numeric'
                            disabled={disabled}
                            defaultValue={value[i] || ''}
                        />
                    ))}
                </div>

                {(hint || errorMessage || onResend) && (
                    <div className='otp-footer'>
                        {(hint || errorMessage) && (
                            <span className='otp-hint'>{errorMessage || hint}</span>
                        )}
                        {onResend && (
                            <button type='button' className='otp-cta' onClick={onResend}>
                                {resendLabel}
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    },
);

OtpInput.displayName = 'OtpInput';

export { OtpInput };
