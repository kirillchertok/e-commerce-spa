import { cva, type VariantProps } from 'class-variance-authority';

export const SELECT_TRIGGER_SIZE = {
    SM: 'sm',
    DEFAULT: 'default',
} as const;

export const selectTriggerVariants = cva(
    "flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
    {
        variants: {
            size: {
                [SELECT_TRIGGER_SIZE.SM]: '',
                [SELECT_TRIGGER_SIZE.DEFAULT]: '',
            },
        },
        defaultVariants: {
            size: SELECT_TRIGGER_SIZE.DEFAULT,
        },
    }
);

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;