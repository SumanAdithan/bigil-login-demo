import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                className={cn('atlas-tag-group', className)}
                ref={ref}
                {...props}
            />
        );
    }
);
TagGroup.displayName = 'TagGroup';

export { TagGroup };
