import { cva, type VariantProps } from 'class-variance-authority';

export const DIALOG_SIZE = {
    DEFAULT: 'default',
    PRODUCT_OPTIONS: 'product-options',
} as const;

export const dialogContentVariants = cva(
    'fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-background shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    {
        variants: {
            size: {
                [DIALOG_SIZE.DEFAULT]: 'max-w-120 gap-4 p-6',
                [DIALOG_SIZE.PRODUCT_OPTIONS]: 'max-w-80 min-h-64 gap-lg p-lg',
            },
        },
        defaultVariants: {
            size: DIALOG_SIZE.DEFAULT,
        },
    }
);

export type DialogContentVariants = VariantProps<typeof dialogContentVariants>;
