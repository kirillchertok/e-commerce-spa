export interface FilterOption {
    label: string;
    value: string;
}

export const COLOR_OPTIONS: FilterOption[] = [
    { label: 'White', value: 'White' },
    { label: 'Dark', value: 'Dark' },
    { label: 'Red', value: 'Red' },
    { label: 'Brown', value: 'Brown' },
    { label: 'Grey', value: 'Grey' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Yellow', value: 'Yellow' },
];

export const SIZE_OPTIONS: FilterOption[] = [
    { label: '36', value: '36' },
    { label: '36.5', value: '36.5' },
    { label: '37', value: '37' },
    { label: '38', value: '38' },
    { label: '40', value: '40' },
    { label: '44', value: '44' },
    { label: 'XS', value: 'XS' },
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
];

export const BRAND_OPTIONS: FilterOption[] = [
    { label: 'Wrangler', value: 'Wrangler' },
    { label: 'Columbia', value: 'Columbia' },
    { label: 'Esprit', value: 'Esprit' },
    { label: 'Torstai', value: 'Torstai' },
    { label: 'Zara', value: 'Zara' },
    { label: 'Nike', value: 'Nike' },
];

export const CONDITION_OPTIONS: FilterOption[] = [
    { label: 'New', value: 'New' },
    { label: 'Like New', value: 'Like New' },
    { label: 'Good', value: 'Good' },
    { label: 'Fair', value: 'Fair' },
];

export const SHOP_OPTIONS: FilterOption[] = [
    { label: 'Shop Vintage', value: 'Shop Vintage' },
    { label: 'Second Look', value: 'Second Look' },
    { label: 'Urban Thrift', value: 'Urban Thrift' },
    { label: 'Eco Wear', value: 'Eco Wear' },
];
