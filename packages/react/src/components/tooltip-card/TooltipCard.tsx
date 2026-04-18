import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';
import { Button } from '../Button';

export interface TooltipCardProps extends React.HTMLAttributes<HTMLDivElement> {
    trigger: React.ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}

interface TooltipCardContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const TooltipCardContext = React.createContext<TooltipCardContextType | undefined>(undefined);

const useTooltipCard = () => {
    const context = React.useContext(TooltipCardContext);
    if (!context) {
        throw new Error('TooltipCard sub-components must be rendered within a TooltipCard provider');
    }
    return context;
};

const TooltipCard = React.forwardRef<HTMLDivElement, TooltipCardProps>(
    ({ className, trigger, placement = 'right', defaultOpen = false, onOpenChange, children, ...props }, ref) => {
        const [isOpen, setIsOpen] = React.useState(defaultOpen);
        const [anchorRect, setAnchorRect] = React.useState<{ top: number; left: number; width: number; height: number } | undefined>();
        const triggerRef = React.useRef<HTMLDivElement>(null);
        const cardRef = React.useRef<HTMLDivElement>(null);

        const handleOpenChange = React.useCallback((open: boolean) => {
            setIsOpen(open);
            onOpenChange?.(open);
        }, [onOpenChange]);

        const updatePosition = React.useCallback(() => {
            if (triggerRef.current) {
                const rect = triggerRef.current.getBoundingClientRect();
                setAnchorRect({
                    top: rect.top + window.scrollY,
                    left: rect.left + window.scrollX,
                    width: rect.width,
                    height: rect.height
                });
            }
        }, []);

        React.useEffect(() => {
            if (isOpen) {
                updatePosition();
                window.addEventListener('scroll', updatePosition, true);
                window.addEventListener('resize', updatePosition);
            }
            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }, [isOpen, updatePosition]);

        const toggleOpen = () => {
            handleOpenChange(!isOpen);
        };

        // Handle clicks outside
        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                const target = event.target as Node;
                if (
                    cardRef.current && !cardRef.current.contains(target) &&
                    triggerRef.current && !triggerRef.current.contains(target)
                ) {
                    handleOpenChange(false);
                }
            };

            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
            }
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, [isOpen, handleOpenChange]);

        const getCardStyle = (): React.CSSProperties => {
            if (!anchorRect) return { display: 'none' };

            const gap = 4; // Tightened from 12px to 4px to eliminate the "huge gap"
            let top = 0;
            let left = 0;
            let transform = '';

            // Tooltip card dimensions are now handled automatically via CSS transforms
            // This allows the card to adapt to dynamic heights (e.g. h-auto!)


            switch (placement) {
                case 'right':
                    top = anchorRect.top;
                    left = anchorRect.left + anchorRect.width + gap;
                    break;
                case 'left':
                    top = anchorRect.top;
                    left = anchorRect.left - gap;
                    transform = 'translateX(-100%) !important';
                    break;
                case 'top':
                    top = anchorRect.top - gap;
                    left = anchorRect.left + (anchorRect.width / 2);
                    transform = 'translate(-50%, -100%) !important';
                    break;
                case 'bottom':
                    top = anchorRect.top + anchorRect.height + gap;
                    left = anchorRect.left + (anchorRect.width / 2);
                    transform = 'translateX(-50%) !important';
                    break;
            }

            return {
                position: 'absolute',
                top: `${top}px !important`,
                left: `${left}px !important`,
                zIndex: 1001,
                transform,
                transition: 'none !important',
                animation: 'none !important'
            };
        };

        return (
            <TooltipCardContext.Provider value={{ isOpen, setIsOpen: handleOpenChange }}>
                <div
                    ref={triggerRef}
                    onClick={toggleOpen}
                    style={{ display: 'block', lineHeight: 0 }}
                    className="tooltip-card-trigger"
                >
                    {trigger}
                </div>

                {isOpen && createPortal(
                    <div
                        ref={(node) => {
                            // Handle both internal and external refs
                            if (typeof ref === 'function') ref(node);
                            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                            (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                        }}
                        className={cn(
                            'tooltip-card',
                            `tooltip-card--placement-${placement}`,
                            className
                        )}
                        style={getCardStyle()}
                        {...props}
                    >
                        {children}
                    </div>,
                    document.body
                )}
            </TooltipCardContext.Provider>
        );
    }
);
TooltipCard.displayName = 'TooltipCard';

const TooltipCardInner = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('tooltip-card__inner', className)} {...props} />
    )
);
TooltipCardInner.displayName = 'TooltipCardInner';

const TooltipCardHeading = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3 ref={ref} className={cn('tooltip-card__heading', className)} {...props} />
    )
);
TooltipCardHeading.displayName = 'TooltipCardHeading';

const TooltipCardText = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={cn('tooltip-card__text', className)} {...props} />
    )
);
TooltipCardText.displayName = 'TooltipCardText';

const TooltipCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('tooltip-card__footer', className)} {...props} />
    )
);
TooltipCardFooter.displayName = 'TooltipCardFooter';

const TooltipCardActionsLeft = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('tooltip-card__actions-left', className)} {...props} />
    )
);
TooltipCardActionsLeft.displayName = 'TooltipCardActionsLeft';

const TooltipCardActionsRight = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('tooltip-card__actions-right', className)} {...props} />
    )
);
TooltipCardActionsRight.displayName = 'TooltipCardActionsRight';

const TooltipCardSnoozeButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, onClick, ...props }, ref) => {
        const { setIsOpen } = useTooltipCard();
        
        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            setIsOpen(false);
            onClick?.(e);
        };

        return (
            <Button
                ref={ref}
                size="sm"
                variant="tertiary"
                className={cn('btn-snooze', className)}
                onClick={handleClick}
                {...props}
            />
        );
    }
);
TooltipCardSnoozeButton.displayName = 'TooltipCardSnoozeButton';

const TooltipCardBackButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, ...props }, ref) => (
        <Button
            ref={ref}
            size="sm"
            variant="secondary"
            className={cn('btn-back', className)}
            {...props}
        />
    )
);
TooltipCardBackButton.displayName = 'TooltipCardBackButton';

const TooltipCardNextButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, ...props }, ref) => (
        <Button
            ref={ref}
            size="sm"
            variant="primary"
            className={cn('btn-next', className)}
            {...props}
        />
    )
);
TooltipCardNextButton.displayName = 'TooltipCardNextButton';

export {
    TooltipCard,
    TooltipCardInner,
    TooltipCardHeading,
    TooltipCardText,
    TooltipCardFooter,
    TooltipCardActionsLeft,
    TooltipCardActionsRight,
    TooltipCardSnoozeButton,
    TooltipCardBackButton,
    TooltipCardNextButton,
};
