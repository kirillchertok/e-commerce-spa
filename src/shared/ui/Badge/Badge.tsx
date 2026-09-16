import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/shared/lib/cn';

import { type BadgeVariants, badgeVariants } from './cva';

interface BadgeProps extends React.ComponentProps<'span'>, BadgeVariants {
    asChild?: boolean;
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
    const Comp = asChild ? Slot.Root : 'span';

    return (
        <Comp
            data-slot='badge'
            data-variant={variant}
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    );
}

export { Badge };

