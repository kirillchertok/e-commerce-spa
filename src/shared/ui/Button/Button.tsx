import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/shared/lib/cn';

import { BUTTON_SIZE, BUTTON_STYLE, type ButtonVariants, buttonVariants } from './cva';

interface ButtonProps extends React.ComponentProps<'button'>, ButtonVariants {
    asChild?: boolean;
}

function Button({
    className,
    variant = BUTTON_STYLE.FIRST,
    size = BUTTON_SIZE.DEFAULT,
    asChild = false,
    ...props
}: ButtonProps) {
    const Comp = asChild ? Slot.Root : 'button';

    return (
        <Comp
            data-slot='button'
            data-variant={variant}
            data-size={size}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button };

