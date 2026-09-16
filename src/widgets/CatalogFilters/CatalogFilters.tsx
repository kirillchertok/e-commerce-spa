import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';

import type { CatalogSearchParams } from '@/features/catalog-filters/model/searchParams';
import { withToggledValue } from '@/features/catalog-filters/model/searchParams';
import { FilterChip } from '@/features/catalog-filters/ui/FilterChip';
import { FilterDropdown } from '@/features/catalog-filters/ui/FilterDropdown';
import { SortBar } from '@/features/product-sorting/ui/SortBar';
import {
    BRAND_OPTIONS,
    COLOR_OPTIONS,
    CONDITION_OPTIONS,
    SHOP_OPTIONS,
    SIZE_OPTIONS,
} from '@/shared/constants/filterOptions';
import { CrossIcon } from '@/shared/constants/icons';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

const ARRAY_FILTER_KEYS = ['colors', 'sizes', 'brands', 'conditions', 'shops'] as const;

type ArrayKey = (typeof ARRAY_FILTER_KEYS)[number];

const FILTER_TITLES: Record<ArrayKey, string> = {
    colors: 'Color',
    sizes: 'Size',
    brands: 'Brand',
    conditions: 'Condition',
    shops: 'Shop',
};

const FILTER_OPTIONS: Record<ArrayKey, { label: string; value: string }[]> = {
    colors: COLOR_OPTIONS,
    sizes: SIZE_OPTIONS,
    brands: BRAND_OPTIONS,
    conditions: CONDITION_OPTIONS,
    shops: SHOP_OPTIONS,
};

export const CatalogFilters = ({ className }: { className?: string }) => {
    const navigate = useNavigate();
    const search = useSearch({ strict: false }) as CatalogSearchParams;

    const createArrayToggleHandler = useCallback(
        (key: ArrayKey) => {
            return (value: string) => {
                navigate({
                    to: '/',
                    search: prev => {
                        const current = prev[key];
                        return { ...prev, [key]: withToggledValue(current, value) };
                    },
                });
            };
        },
        [navigate]
    );

    const createChipRemoveHandler = useCallback(
        (key: keyof CatalogSearchParams) => {
            return () => {
                if (key === 'category') {
                    navigate({
                        to: '/',
                        search: prev => ({ ...prev, category: undefined, subCategory: undefined }),
                    });
                } else {
                    navigate({
                        to: '/',
                        search: prev => ({ ...prev, [key]: undefined }),
                    });
                }
            };
        },
        [navigate]
    );

    const handleToggleSale = useCallback(() => {
        navigate({
            to: '/',
            search: prev => ({ ...prev, sale: prev.sale ? undefined : true }),
        });
    }, [navigate]);

    const activeChips = useMemo(() => {
        const chips: { key: keyof CatalogSearchParams; label: string }[] = [];

        if (search.category) {
            chips.push({
                key: 'category',
                label: search.subCategory || search.category,
            });
        }

        ARRAY_FILTER_KEYS.forEach(key => {
            const values = search[key];

            if (values && values.length > 0) {
                chips.push({ key, label: values.join(', ') });
            }
        });

        return chips;
    }, [search]);

    return (
        <div className={cn('flex flex-col gap-lg', className)}>
            <div className='flex flex-wrap items-center gap-sm'>
                {ARRAY_FILTER_KEYS.map(key => (
                    <FilterDropdown
                        key={key}
                        title={FILTER_TITLES[key]}
                        options={FILTER_OPTIONS[key]}
                        selectedValues={search[key] ?? []}
                        onToggle={createArrayToggleHandler(key)}
                    />
                ))}

                <Button
                    variant={search.sale ? BUTTON_STYLE.SALE : BUTTON_STYLE.FILTER}
                    size={BUTTON_SIZE.DEFAULT}
                    onClick={handleToggleSale}
                    className='gap-xs'
                >
                    <span>Sale</span>
                    {search.sale && <CrossIcon className='h-3.5 w-3.5' />}
                </Button>
            </div>

            <div className='flex flex-wrap items-center gap-sm'>
                {activeChips.map(chip => (
                    <FilterChip
                        key={chip.key}
                        label={chip.label}
                        onRemove={createChipRemoveHandler(chip.key)}
                    />
                ))}
            </div>

            <SortBar />
        </div>
    );
};

