import React from 'react';
import { cn } from '../../lib/utils';

export interface LayoutBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  dashed?: boolean;
  cascade?: boolean;
  direction?: 'row' | 'column';
  grid?: 2 | 3 | 4;
}

const LayoutBlockBase = React.forwardRef<HTMLDivElement, LayoutBlockProps>(
  ({ className, dashed, cascade, direction, grid, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'layout-block',
          dashed && 'layout-block--dashed',
          cascade && 'layout-block--cascade',
          direction === 'column' && 'layout-block--column',
          direction === 'row' && 'layout-block--row',
          grid && `layout-block--grid-${grid}`,
          className
        )}
        {...props}
      />
    );
  }
);

LayoutBlockBase.displayName = 'LayoutBlock';

export interface LayoutBlockGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  depth?: 1 | 2 | 3 | 4 | 5;
}

const LayoutBlockGroup = React.forwardRef<HTMLDivElement, LayoutBlockGroupProps>(
  ({ className, label, depth, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'layout-block-group',
          depth && `layout-block__item--depth-${depth}`,
          className
        )}
        {...props}
      >
        {label && <span className="layout-block-group__label">{label}</span>}
        {children}
      </div>
    );
  }
);

LayoutBlockGroup.displayName = 'LayoutBlock.Group';

export interface LayoutBlockItemProps extends React.HTMLAttributes<HTMLDivElement> {
  depth?: 1 | 2 | 3 | 4 | 5;
}

const LayoutBlockItem = React.forwardRef<HTMLDivElement, LayoutBlockItemProps>(
  ({ className, depth, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'layout-block__item',
          depth && `layout-block__item--depth-${depth}`,
          className
        )}
        {...props}
      />
    );
  }
);

LayoutBlockItem.displayName = 'LayoutBlock.Item';

export interface LayoutBlockNestedProps extends React.HTMLAttributes<HTMLDivElement> {}

const LayoutBlockNested = React.forwardRef<HTMLDivElement, LayoutBlockNestedProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('layout-block__nested', className)}
        {...props}
      />
    );
  }
);

LayoutBlockNested.displayName = 'LayoutBlock.Nested';

export interface LayoutBlockBadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

const LayoutBlockBadge = React.forwardRef<HTMLDivElement, LayoutBlockBadgeProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('layout-block__badge', className)}
        {...props}
      />
    );
  }
);

LayoutBlockBadge.displayName = 'LayoutBlock.Badge';

// Compound Component Assignment
export const LayoutBlock = Object.assign(LayoutBlockBase, {
  Group: LayoutBlockGroup,
  Item: LayoutBlockItem,
  Nested: LayoutBlockNested,
  Badge: LayoutBlockBadge,
});
