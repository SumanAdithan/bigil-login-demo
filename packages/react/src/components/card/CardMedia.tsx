import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('card-media', className)} {...props} />
    )
);
CardMedia.displayName = 'CardMedia';

export { CardMedia };
