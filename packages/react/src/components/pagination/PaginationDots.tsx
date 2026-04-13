import * as React from 'react';
import { cn } from '../../lib/utils';

export interface PaginationDotsProps {
    total: number;
    activeIndex: number;
    onDotClick?: (index: number) => void;
    className?: string;
    dotClassName?: string;
}

/**
 * PaginationDots component for indicating carousel or multi-step progress.
 * Uses button elements for improved accessibility and interactive support.
 */
const PaginationDots: React.FC<PaginationDotsProps> = ({ 
    total, 
    activeIndex, 
    onDotClick, 
    className,
    dotClassName 
}) => {
    return (
        <div className={cn('pagination', className)} role="tablist">
            {Array.from({ length: total }).map((_, index) => {
                const isActive = index === activeIndex;
                
                return (
                    <button
                        key={index}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Go to slide ${index + 1}`}
                        className={cn(
                            'pagination-dot',
                            isActive && 'pagination-dot-active',
                            dotClassName
                        )}
                        onClick={() => onDotClick?.(index)}
                    />
                );
            })}
        </div>
    );
};

PaginationDots.displayName = 'PaginationDots';

export { PaginationDots };
