import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('card-content', className)} {...props} />
    )
);
CardContent.displayName = 'CardContent';

export { CardContent };
