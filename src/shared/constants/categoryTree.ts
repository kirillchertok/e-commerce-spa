export interface CategoryTreeItem {
    id: string;
    label: string;
    children?: {
        id: string;
        label: string;
        children?: {
            id: string;
            label: string;
        }[];
    }[];
}

export const CATEGORY_TREE: CategoryTreeItem[] = [
    { id: 'shoes', label: 'Shoes' },
    { id: 'apparel', label: 'Apparel' },
    {
        id: 'accessories',
        label: 'Accessories',
        children: [
            {
                id: 'belts',
                label: 'Belts',
                children: [{ id: 'leather-belts', label: 'Leather belts' }],
            },
            { id: 'hats', label: 'Hats' },
            { id: 'bags', label: 'Bags' },
        ],
    },
    { id: 'sport', label: 'Sport' },
    { id: 'beauty', label: 'Beauty' },
];

export const DEFAULT_EXPANDED_CATEGORIES: Record<string, boolean> = {
    accessories: true,
    belts: true,
};
