import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';
// @ts-ignore - Importing from sister package which might not have types generated yet
import { Modal as VanillaModal } from '@atlas-ds/js';

interface ModalContextValue {
  onClose?: () => void;
  isOpen?: boolean;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

export interface ModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  container?: HTMLElement;
}

/**
 * Modal Component (Wrapper)
 * 
 * High-fidelity React wrapper around the Atlas Vanilla JS Modal logic.
 * Ensures consistent behavior (Esc key, backdrop interaction) across frameworks.
 */
export function Modal({ children, isOpen, onClose, container }: ModalProps) {
  const [mounted, setMounted] = React.useState(false);
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const instanceRef = React.useRef<any>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize Vanilla JS Modal once the backdrop is available
  React.useEffect(() => {
    if (mounted && backdropRef.current && !instanceRef.current) {
      instanceRef.current = new VanillaModal(backdropRef.current);
      
      // Override the vanilla close method to notify React
      const originalClose = instanceRef.current.close.bind(instanceRef.current);
      instanceRef.current.close = () => {
        originalClose();
        if (onClose) onClose();
      };
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [mounted, onClose]);

  // Synchronize state prop with vanilla instance
  React.useEffect(() => {
    if (instanceRef.current) {
      if (isOpen) {
        instanceRef.current.open();
      } else {
        instanceRef.current.close();
      }
    }
  }, [isOpen]);

  if (!mounted) return null;

  const content = (
    <ModalContext.Provider value={{ onClose, isOpen }}>
      <div ref={backdropRef} className={cn('modal-backdrop', isOpen && 'is-open')}>
        {children}
      </div>
    </ModalContext.Provider>
  );

  return createPortal(content, container || document.body);
}

export interface ModalOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * ModalOverlay is part of the backdrop. Clicking it should trigger onClose.
 * (Native JS class handles this by checking event.target === backdrop)
 */
export const ModalOverlay = React.forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('modal-overlay-area', className)} {...props} />;
  }
);
ModalOverlay.displayName = 'ModalOverlay';

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('modal', `modal-${size}`, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ModalContent.displayName = 'ModalContent';

export interface ModalHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  isCentered?: boolean;
  icon?: React.ReactNode;
  showCloseButton?: boolean;
  hideBorder?: boolean;
}

export const ModalHeader = React.forwardRef<HTMLElement, ModalHeaderProps>(
  ({ className, title, description, isCentered, icon, showCloseButton = true, hideBorder, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'modal-header',
          isCentered && 'is-centered',
          hideBorder && 'no-border',
          className
        )}
        style={isCentered ? { flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '2rem', width: '100%', position: 'relative' } : undefined}
        {...props}
      >
        {isCentered && icon && (
          <div style={{
            width: '56px',
            height: '56px',
            background: 'rgba(249, 115, 22, 0.08)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ea580c',
            marginBottom: '1rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {icon}
          </div>
        )}
        
        {title && (
          <h2 className="modal-title" style={isCentered ? { fontSize: '1.5rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.25rem' } : undefined}>
            {title}
          </h2>
        )}
        
        {description && (
          <p className="modal-description" style={isCentered ? { fontSize: '1rem', color: '#64748b' } : undefined}>
            {description}
          </p>
        )}

        {children}

        {showCloseButton && (
          <button 
            type="button"
            className="modal-close" 
            data-modal-close
            style={isCentered ? { position: 'absolute', top: '1.5rem', right: '1.5rem' } : undefined}
          >
            <X size={20} />
          </button>
        )}
      </header>
    );
  }
);
ModalHeader.displayName = 'ModalHeader';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('modal-body', className)} {...props} />;
  }
);
ModalBody.displayName = 'ModalBody';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLElement> {}

export const ModalFooter = React.forwardRef<HTMLElement, ModalFooterProps>(
  ({ className, ...props }, ref) => {
    return <footer ref={ref} className={cn('modal-footer', className)} {...props} />;
  }
);
ModalFooter.displayName = 'ModalFooter';
