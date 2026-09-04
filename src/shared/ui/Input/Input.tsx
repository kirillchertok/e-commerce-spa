import * as React from 'react';

import { cn } from '@/shared/lib/cn';

import { INPUT_SIZE, INPUT_STYLE, type InputVariants, inputVariants } from './cva';

interface InputProps extends Omit<React.ComponentProps<'input'>, 'size'>, InputVariants {
    icon?: React.ReactNode;
}

function Input({
    icon,
    className,
    type,
    variant = INPUT_STYLE.FIRST,
    size = INPUT_SIZE.MEDIUM,
    ...props
}: InputProps) {
    return (
        <div className={cn('relative', size === INPUT_SIZE.FULL && 'w-full')}>
            {icon && (
                <span className='absolute text-md left-4 top-1/2 -translate-y-1/2'>{icon}</span>
            )}
            <input
                type={type}
                data-slot='input'
                className={cn(
                    inputVariants({
                        variant,
                        size,
                    }),
                    icon && 'pl-8',
                    className
                )}
                {...props}
            />
        </div>
    );
}

export { Input };

