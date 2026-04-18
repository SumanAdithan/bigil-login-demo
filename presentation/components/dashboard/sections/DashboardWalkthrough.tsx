import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
    TooltipCard, 
    TooltipCardInner, 
    TooltipCardHeading, 
    TooltipCardText, 
    TooltipCardFooter, 
    TooltipCardActionsLeft, 
    TooltipCardActionsRight, 
    TooltipCardSnoozeButton, 
    TooltipCardBackButton, 
    TooltipCardNextButton
} from '@atlas-ds/react';

export interface WalkthroughStep {
    id: string;
    targetSelector: string;
    title: string;
    description: string;
    placement?: 'right' | 'bottom' | 'top' | 'left';
}

interface DashboardWalkthroughProps {
    isOpen: boolean;
    onClose: () => void;
    steps: WalkthroughStep[];
}

export const DashboardWalkthrough = ({ isOpen, onClose, steps }: DashboardWalkthroughProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

    const step = steps[currentStep];

    const findTarget = (selector: string): HTMLElement | null => {
        // Create a regex that handles both curly and straight apostrophes
        const normalizedSelector = selector.replace(/['’]/g, "['’]");
        const regex = new RegExp(normalizedSelector, 'i');

        // Find by heading text content (h1-h6)
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const targetHeading = headings.find(h => regex.test(h.textContent || ''));
        
        if (targetHeading) {
            // Find the closest parent that looks like a card container (rounded-[12px] is common)
            return targetHeading.closest('.rounded-\\[12px\\]') as HTMLElement || targetHeading.parentElement;
        }
        return document.querySelector(selector) as HTMLElement;
    };

    useEffect(() => {
        if (!isOpen || !step) return;

        // Clear coordinates immediately when step changes to prevent "ghosting" from previous step
        setCoords(null);

        const updatePosition = () => {
            const el = findTarget(step.targetSelector);
            if (el) {
                // Ensure the element is in view instantly so rect is accurate
                el.scrollIntoView({ behavior: 'auto', block: 'center' });
                
                const rect = el.getBoundingClientRect();
                setCoords({
                    top: rect.top + window.scrollY,
                    left: rect.left + window.scrollX,
                    width: rect.width,
                    height: rect.height
                });
            } else {
                setCoords(null);
            }
        };

        // Double-check position after a small delay to handle layout shifts/animations
        const timer1 = setTimeout(updatePosition, 50);
        const timer2 = setTimeout(updatePosition, 400);

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [isOpen, step, step.targetSelector]);

    if (!isOpen || !step || !coords) return null;

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            onClose();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const getTooltipOverrideStyle = (): any => {
        if (!coords || !step) return {};
        const gap = 12; // Increased from 4px to 12px for better spacing
        let top = 0;
        let left = 0;
        let transform = '';

        switch (step.placement || 'right') {
            case 'top':
                top = coords.top - gap;
                left = coords.left + coords.width / 2;
                transform = 'translate(-50%, -100%)';
                break;
            case 'bottom':
                top = coords.top + coords.height + gap;
                left = coords.left + coords.width / 2;
                transform = 'translateX(-50%)';
                break;
            case 'right':
                top = coords.top;
                left = coords.left + coords.width + gap;
                transform = 'none';
                break;
            case 'left':
                top = coords.top;
                left = coords.left - gap;
                transform = 'translateX(-100%)';
                break;
        }

        return {
            '--tooltip-top': `${top}px`,
            '--tooltip-left': `${left}px`,
            '--tooltip-transform': transform,
            zIndex: 1001,
        };
    };

    return (
        <>
            {/* Spotlight Overlay */}
            {createPortal(
                <div className="fixed inset-0 z-999 overflow-hidden pointer-events-none">
                    <svg className="absolute inset-0 w-full h-full">
                        <defs>
                            <mask id="spotlight-mask">
                                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                                <rect
                                    x={coords.left - window.scrollX}
                                    y={coords.top - window.scrollY}
                                    width={coords.width}
                                    height={coords.height}
                                    rx="12"
                                    fill="black"
                                />
                            </mask>
                        </defs>
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="#1A1A1A"
                            fillOpacity="0.36"
                            mask="url(#spotlight-mask)"
                            className="pointer-events-auto cursor-pointer"
                            onClick={onClose}
                        />
                    </svg>
                </div>,
                document.body
            )}

            {/* Official Design System Tooltip Card */}
            {createPortal(
                <div 
                    style={{ 
                        position: 'absolute',
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                        width: `${coords.width}px`,
                        height: `${coords.height}px`,
                        pointerEvents: 'none',
                        zIndex: 1001
                    }}
                >
                    <TooltipCard
                        key={currentStep}
                        className="h-auto! min-h-0! top-(--tooltip-top)! left-(--tooltip-left)! transform-(--tooltip-transform)! block! visible! opacity-100!"
                        trigger={
                            <div 
                                style={{ 
                                    width: `${coords.width}px`, 
                                    height: `${coords.height}px`,
                                }}
                            />
                        }
                        placement={step.placement || 'right'}
                        defaultOpen={true}
                        style={getTooltipOverrideStyle()}
                    >
                        <TooltipCardInner>
                            <TooltipCardHeading>{step.title}</TooltipCardHeading>
                            <TooltipCardText>{step.description}</TooltipCardText>
                            <TooltipCardFooter>
                                <TooltipCardActionsLeft>
                                    <TooltipCardSnoozeButton onClick={onClose}>
                                        Snooze
                                    </TooltipCardSnoozeButton>
                                </TooltipCardActionsLeft>
                                <TooltipCardActionsRight>
                                    <div className="flex gap-2">
                                        <TooltipCardBackButton 
                                            onClick={prevStep}
                                            disabled={currentStep === 0}
                                        >
                                            Back
                                        </TooltipCardBackButton>
                                        <TooltipCardNextButton onClick={nextStep}>
                                            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </TooltipCardNextButton>
                                    </div>
                                </TooltipCardActionsRight>
                            </TooltipCardFooter>
                        </TooltipCardInner>
                    </TooltipCard>
                </div>,
                document.body
            )}
        </>
    );
};
