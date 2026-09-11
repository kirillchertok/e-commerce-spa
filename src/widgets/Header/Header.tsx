import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';
import { HeartFilledIcon, SearchIcon, ShoppingBagIcon, UserIcon } from '@/shared/constants/icons';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';
import { Input, INPUT_SIZE, INPUT_STYLE } from '@/shared/ui/Input/Input';

const SEARCH_DEBOUNCE_MS = 500;

export const Header = () => {
    const navigate = useNavigate();
    const { search: searchParam } = useSearch({ strict: false }) as { search?: string };
    const favoritesCount = useAppSelector(state => state.favorites.favoriteIds.length);
    const cartCount = useAppSelector(state =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    );

    const [searchInput, setSearchInput] = useState(searchParam ?? '');
    const debouncedSearch = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_MS);

    useEffect(() => {
        navigate({
            to: '/',
            search: prev => ({
                ...prev,
                search: debouncedSearch.length > 0 ? debouncedSearch : undefined,
            }),
        });
    }, [debouncedSearch, navigate]);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    }, []);

    return (
        <header className='w-full bg-gemma text-white shadow-xs'>
            <div className='mx-auto flex max-w-screen-2xl items-center justify-between px-md py-sm lg:px-lg'>
                <div className='flex items-center gap-lg'>
                    <Link
                        to='/'
                        className='flex items-center gap-sm transition hover:opacity-90'
                    >
                        <div className='flex h-9 w-9 items-center justify-center rounded-sm bg-white font-bold text-gemma'>
                            <span className='text-xs leading-none font-black'>2ND</span>
                        </div>
                        <div className='flex flex-col text-xs font-black leading-tight tracking-wider uppercase'>
                            <span>2ND</span>
                            <span>HAND</span>
                            <span>MARKET</span>
                        </div>
                    </Link>

                    <div className='relative hidden md:block lg:w-80'>
                        <Input
                            value={searchInput}
                            onChange={handleSearchChange}
                            variant={INPUT_STYLE.SECOND}
                            size={INPUT_SIZE.LARGE}
                            aria-label='Search products'
                            icon={<SearchIcon className='h-4 w-4' />}
                            className='h-9 rounded-full py-xs text-sm'
                        />
                    </div>
                </div>

                <div className='flex items-center gap-md'>
                    <Button
                        variant={BUTTON_STYLE.GHOST}
                        size={BUTTON_SIZE.DEFAULT}
                        aria-label='Favorites'
                        className='gap-xs'
                    >
                        <HeartFilledIcon className='h-5 w-5 fill-white' />
                        <span className='text-sm font-semibold'>{favoritesCount}</span>
                    </Button>

                    <Button
                        variant={BUTTON_STYLE.GHOST}
                        size={BUTTON_SIZE.DEFAULT}
                        aria-label='Cart'
                        className='gap-xs'
                    >
                        <ShoppingBagIcon className='h-5 w-5 stroke-white stroke-2' />
                        <span className='text-sm font-semibold'>{cartCount}</span>
                    </Button>

                    <Button
                        variant={BUTTON_STYLE.GHOST}
                        size={BUTTON_SIZE.DEFAULT}
                        aria-label='User Profile'
                    >
                        <UserIcon className='h-5 w-5 stroke-white stroke-2' />
                    </Button>
                </div>
            </div>

            <div className='px-md pb-md md:hidden'>
                <Input
                    value={searchInput}
                    onChange={handleSearchChange}
                    variant={INPUT_STYLE.SECOND}
                    size={INPUT_SIZE.FULL}
                    aria-label='Search products mobile'
                    icon={<SearchIcon className='h-4 w-4' />}
                    className='h-9 rounded-full py-xs text-sm'
                />
            </div>
        </header>
    );
};

