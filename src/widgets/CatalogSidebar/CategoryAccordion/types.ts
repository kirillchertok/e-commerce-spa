import type { CategoryTreeItem } from '@/shared/constants/categoryTree';

export interface CategoryTreeContext {
    category?: string;
    subCategory?: string;
    expandedCategories: Record<string, boolean>;
    onSelect: (category: string, subCategory?: string) => void;
    onToggle: (id: string) => void;
}

export type SubCategoryTreeNode = NonNullable<CategoryTreeItem['children']>[number];

export interface SubCategoryNodeProps {
    node: SubCategoryTreeNode;
    parentLabel: string;
    context: CategoryTreeContext;
}

export interface CategoryNodeProps {
    node: CategoryTreeItem;
    context: CategoryTreeContext;
}