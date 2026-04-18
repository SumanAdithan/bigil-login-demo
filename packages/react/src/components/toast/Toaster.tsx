import * as React from 'react';
import { createPortal } from 'react-dom';
import { 
    Toast, 
    ToastBody, 
    ToastIcon, 
    ToastContent, 
    ToastTitle, 
    ToastDescription, 
    ToastAction, 
    ToastClose 
} from './Toast';
import { useToast } from './use-toast';
import { 
    Info, 
    CheckCircle2, 
    AlertTriangle, 
    AlertCircle, 
    X 
} from 'lucide-react';

const icons = {
    neutral: <Info size={20} />,
    success: <CheckCircle2 size={20} />,
    warning: <AlertTriangle size={20} />,
    danger: <AlertCircle size={20} />,
    info: <Info size={20} />,
};

/**
 * Toaster Component
 * 
 * Render this once at the root of your application (e.g. App.tsx)
 * It will listen to the toast store and render notifications in a 
 * fixed container using React Portals.
 */
export const Toaster = () => {
    const { toasts, dismiss } = useToast();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div className="toast-container" aria-live="polite">
            {toasts.map((toast) => (
                <Toast key={toast.id} variant={toast.variant}>
                    <ToastBody>
                        <ToastIcon>
                            {icons[toast.variant]}
                        </ToastIcon>
                        <ToastContent>
                            <ToastTitle>{toast.title}</ToastTitle>
                            {toast.description && (
                                <ToastDescription>{toast.description}</ToastDescription>
                            )}
                        </ToastContent>
                        {toast.action && (
                            <ToastAction onClick={() => {
                                toast.onAction?.();
                                dismiss(toast.id);
                            }}>
                                {toast.action}
                            </ToastAction>
                        )}
                        <ToastClose onClick={() => dismiss(toast.id)}>
                            <X size={16} />
                        </ToastClose>
                    </ToastBody>
                </Toast>
            ))}
        </div>,
        document.body
    );
};
