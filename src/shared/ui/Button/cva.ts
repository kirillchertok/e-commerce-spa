import { cva, type VariantProps } from 'class-variance-authority';

export const BUTTON_STYLE = {
    FIRST: 'first',
    ICON: 'icon',
    GHOST: 'ghost',
    FILTER: 'filter',
    SALE: 'sale',
    LINK: 'link',
} as const;

export const BUTTON_SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    DEFAULT: 'default',
} as const;

export const buttonVariants = cva(
    'flex cursor-pointer flex-row items-center justify-center gap-sm font-sf transition-transform duration-500 ease-linear hover:scale-[1.02] active:scale-[0.98]',
    {
        variants: {
            variant: {
                [BUTTON_STYLE.FIRST]: 'bg-soft-red-transperant p-md rounded-md text-white text-md',
                [BUTTON_STYLE.ICON]:
                    'border border-matte-steel p-sm rounded-full aspect-square text-lg',
                [BUTTON_STYLE.GHOST]:
                    'text-white rounded-full hover:bg-white-transperant p-sm text-sm font-semibold',
                [BUTTON_STYLE.FILTER]:
                    'bg-white border border-matte-steel rounded-full px-md py-sm text-sm font-semibold text-dark-charcoal hover:bg-matte-steel',
                [BUTTON_STYLE.SALE]:
                    'bg-soft-red text-white rounded-full px-md py-sm text-sm font-semibold hover:bg-girly-red',
                [BUTTON_STYLE.LINK]:
                    'text-soft-red font-semibold hover:text-girly-red text-sm rounded-none',
            },
            size: {
                [BUTTON_SIZE.SMALL]: 'h-4 w-12',
                [BUTTON_SIZE.MEDIUM]: 'h-9 w-20',
                [BUTTON_SIZE.LARGE]: 'h-10 w-30',
                [BUTTON_SIZE.DEFAULT]: 'h-auto w-auto',
            },
        },
        defaultVariants: {
            variant: BUTTON_STYLE.FIRST,
            size: BUTTON_SIZE.MEDIUM,
        },
    }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
