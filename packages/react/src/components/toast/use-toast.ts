import * as React from 'react';

export type ToastVariant = 'danger' | 'info' | 'warning' | 'success' | 'neutral';

export interface ToastData {
    id: string;
    variant: ToastVariant;
    title: string;
    description?: string;
    action?: string;
    onAction?: () => void;
}

type ToastOptions = Omit<ToastData, 'id'>;

const listeners = new Set<(toasts: ToastData[]) => void>();
let toasts: ToastData[] = [];

const notify = () => {
    listeners.forEach((listener) => listener([...toasts]));
};

/**
 * Imperative API to trigger a toast
 */
export const toast = (options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...options, id };
    
    // Add toast to the active list
    toasts = [...toasts, newToast];
    notify();

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        toasts = toasts.filter((t) => t.id !== id);
        notify();
    }, 5000);

    return id;
};

/**
 * Hook to subscribe to the toast store
 */
export const useToast = () => {
    const [activeToasts, setActiveToasts] = React.useState<ToastData[]>(toasts);

    React.useEffect(() => {
        listeners.add(setActiveToasts);
        return () => {
            listeners.delete(setActiveToasts);
        };
    }, []);

    return {
        toasts: activeToasts,
        toast,
        dismiss: (id: string) => {
            toasts = toasts.filter((t) => t.id !== id);
            notify();
        }
    };
};
