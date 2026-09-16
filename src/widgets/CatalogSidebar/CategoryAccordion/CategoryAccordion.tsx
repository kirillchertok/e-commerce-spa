import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useState } from 'react';

import { CATEGORY_TREE, DEFAULT_EXPANDED_CATEGORIES } from '@/shared/constants/categoryTree';

import { CategoryNode } from './CategoryNode';
import type { CategoryTreeContext } from './types';

export const CategoryAccordion = () => {
    const navigate = useNavigate();
    const { category, subCategory } = useSearch({ strict: false }) as {
        category?: string;
        subCategory?: string;
    };

    const [expandedCategories, setExpandedCategories] =
        useState<Record<string, boolean>>(DEFAULT_EXPANDED_CATEGORIES);

    const handleToggle = useCallback((id: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }, []);

    const handleSelect = useCallback(
        (nextCategory: string, nextSubCategory?: string) => {
            navigate({
                to: '/',
                search: prev => ({
                    ...prev,
                    category: nextCategory,
                    subCategory: nextSubCategory
                })
            });
        },
        [navigate]
    );

    const treeContext: CategoryTreeContext = {
        category,
        subCategory,
        expandedCategories,
        onToggle: handleToggle,
        onSelect: handleSelect
    };

    return (
        <div className='flex flex-col gap-xs'>
            {CATEGORY_TREE.map(node => (
                <CategoryNode
                    key={node.id}
                    node={node}
                    context={treeContext}
                />
            ))}
        </div>
    );
};