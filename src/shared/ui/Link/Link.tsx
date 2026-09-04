import { Link as TLink, type LinkProps as TLinkProps } from '@tanstack/react-router';
import type React from 'react';

import { cn } from '@/shared/lib/cn';

interface LinkProps extends TLinkProps {
    className?: string;
    children: React.ReactNode;
}

export const Link = ({ className, children, ...attrs }: LinkProps) => (
    <TLink
        className={cn(className, 'text-waterfall hover:underline')}
        {...attrs}
    >
        {children}
    </TLink>
);
