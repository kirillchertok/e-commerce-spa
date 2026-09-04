import { cva, type VariantProps } from 'class-variance-authority';

export const INPUT_STYLE = {
    FIRST: 'first',
    SECOND: 'second',
} as const;

export const INPUT_SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    FULL: 'full',
} as const;

export const inputVariants = cva(
    'h-12 border-0 text-lg font-sf text-white p-md focus:outline-none rounded-md',
    {
        variants: {
            variant: {
                [INPUT_STYLE.FIRST]: 'bg-gemma',
                [INPUT_STYLE.SECOND]: 'bg-white-transperant',
            },

            size: {
                [INPUT_SIZE.SMALL]: 'w-28',
                [INPUT_SIZE.MEDIUM]: 'w-40',
                [INPUT_SIZE.LARGE]: 'w-52',
                [INPUT_SIZE.FULL]: 'w-full',
            },
        },

        defaultVariants: {
            variant: INPUT_STYLE.FIRST,
            size: INPUT_SIZE.MEDIUM,
        },
    }
);

export type InputVariants = VariantProps<typeof inputVariants>;
