export const CATEGORY_NAV_ITEMS = ['Women', 'Men', 'Unisex', 'Children', 'New'] as const;

export type GenderCategory = (typeof CATEGORY_NAV_ITEMS)[number];

