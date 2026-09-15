import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useCreateOrderMutation } from '@/entities/order/api/useCreateOrderMutation';
import { formatPrice } from '@/entities/product/lib/formatPrice';
import {
    selectCartItems,
    selectCartSubtotal,
    selectCartTotalQuantity,
} from '@/features/product-cart/model/cartSelectors';
import {
    clearCart,
    decrementItem,
    incrementItem,
    removeItem,
} from '@/features/product-cart/model/cartSlice';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select';

const SHIPPING_COST = 4.9;

export const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const user = useAppSelector(state => state.auth.user);
    const totalQuantity = useAppSelector(selectCartTotalQuantity);
    const subtotal = useAppSelector(selectCartSubtotal);
    const createOrderMutation = useCreateOrderMutation();
    const [shippingCountry, setShippingCountry] = useState('Germany');
    const [deliveryMethod, setDeliveryMethod] = useState('1-3 working days');

    const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(decrementItem(event.currentTarget.dataset.lineId ?? ''));
    };

    const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(incrementItem(event.currentTarget.dataset.lineId ?? ''));
    };

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(removeItem(event.currentTarget.dataset.lineId ?? ''));
    };

    const total = subtotal + (items.length > 0 ? SHIPPING_COST : 0);

    const handleCheckout = async () => {
        if (items.length === 0 || !user) {
            return;
        }

        await createOrderMutation.mutateAsync({
            items,
            shippingCountry,
            deliveryMethod,
            userId: user.uid,
        });

        dispatch(clearCart());
        navigate({ to: '/orders' });
    };

    return (
        <div className='mx-auto max-w-screen-2xl px-md py-lg lg:px-lg'>
            <div className='mb-lg flex items-end justify-between gap-md'>
                <div>
                    <h1 className='text-2xl font-semibold text-dark-charcoal'>Shopping cart</h1>
                    <p className='mt-xs text-sm text-muted-foreground'>
                        {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                    </p>
                </div>
                <Button
                    asChild
                    variant={BUTTON_STYLE.FILTER}
                    size={BUTTON_SIZE.DEFAULT}
                >
                    <Link to='/'>Continue shopping</Link>
                </Button>
            </div>

            {items.length === 0 ? (
                <div className='rounded-lg border border-dashed border-matte-steel bg-white/60 px-md py-xl text-center'>
                    <p className='text-lg font-semibold text-dark-charcoal'>Your cart is empty</p>
                    <p className='mt-xs text-sm text-muted-foreground'>
                        Add a product from the catalog to start an order.
                    </p>
                    <Button
                        asChild
                        variant={BUTTON_STYLE.FIRST}
                        size={BUTTON_SIZE.DEFAULT}
                        className='mt-md'
                    >
                        <Link to='/'>Browse products</Link>
                    </Button>
                </div>
            ) : (
                <div className='grid gap-lg lg:grid-cols-[minmax(0,1fr)_22rem]'>
                    <div className='flex flex-col gap-lg'>
                        <section className='rounded-md bg-white p-md shadow-xs'>
                            <div className='mb-md flex items-center justify-between'>
                                <h2 className='text-lg font-semibold text-dark-charcoal'>
                                    Products
                                </h2>
                                <span className='text-sm text-muted-foreground'>
                                    {totalQuantity} items
                                </span>
                            </div>
                            <div className='flex flex-col divide-y divide-gainsboro'>
                                {items.map(item => (
                                    <article
                                        key={item.lineId}
                                        className='flex gap-md py-md first:pt-0 last:pb-0'
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className='h-28 w-24 shrink-0 rounded-sm object-cover sm:h-36 sm:w-28'
                                        />
                                        <div className='flex min-w-0 flex-1 flex-col justify-between gap-sm'>
                                            <div className='flex justify-between gap-md'>
                                                <div className='min-w-0'>
                                                    <h3 className='truncate font-semibold text-dark-charcoal'>
                                                        {item.title}
                                                    </h3>
                                                    <div className='mt-xs flex flex-wrap gap-sm text-xs text-muted-foreground'>
                                                        {item.size && (
                                                            <span>Size: {item.size}</span>
                                                        )}
                                                        {item.color && (
                                                            <span>Color: {item.color}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className='shrink-0 font-semibold text-dark-charcoal'>
                                                    {formatPrice(item.unitPrice * item.quantity)}
                                                </span>
                                            </div>
                                            <div className='flex items-center justify-between gap-sm'>
                                                <div className='flex items-center gap-sm'>
                                                    <Button
                                                        type='button'
                                                        variant={BUTTON_STYLE.ICON}
                                                        size={BUTTON_SIZE.DEFAULT}
                                                        onClick={handleDecrement}
                                                        data-line-id={item.lineId}
                                                        disabled={item.quantity <= 1}
                                                        aria-label='Decrease quantity'
                                                        className='h-8 w-8'
                                                    >
                                                        -
                                                    </Button>
                                                    <span className='min-w-5 text-center text-sm font-semibold'>
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        type='button'
                                                        variant={BUTTON_STYLE.ICON}
                                                        size={BUTTON_SIZE.DEFAULT}
                                                        onClick={handleIncrement}
                                                        data-line-id={item.lineId}
                                                        disabled={item.quantity >= item.stock}
                                                        aria-label='Increase quantity'
                                                        className='h-8 w-8'
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                <Button
                                                    type='button'
                                                    variant={BUTTON_STYLE.GHOST}
                                                    size={BUTTON_SIZE.DEFAULT}
                                                    onClick={handleRemove}
                                                    data-line-id={item.lineId}
                                                    className='text-sm text-soft-red'
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className='grid gap-md rounded-md bg-white p-md shadow-xs sm:grid-cols-2'>
                            <div>
                                <h2 className='text-lg font-semibold text-dark-charcoal'>
                                    Delivery
                                </h2>
                                <p className='mt-xs text-sm text-muted-foreground'>
                                    Choose where and how your order should arrive.
                                </p>
                            </div>
                            <div className='flex flex-col gap-md'>
                                <label
                                    htmlFor='shipping-country'
                                    className='flex flex-col gap-xs text-sm font-medium text-dark-charcoal'
                                >
                                    Shipping country
                                    <Select
                                        value={shippingCountry}
                                        onValueChange={setShippingCountry}
                                    >
                                        <SelectTrigger
                                            id='shipping-country'
                                            aria-label='Shipping country'
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='Germany'>Germany</SelectItem>
                                            <SelectItem value='France'>France</SelectItem>
                                            <SelectItem value='Poland'>Poland</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </label>
                                <label
                                    htmlFor='delivery-method'
                                    className='flex flex-col gap-xs text-sm font-medium text-dark-charcoal'
                                >
                                    Delivery time
                                    <Select
                                        value={deliveryMethod}
                                        onValueChange={setDeliveryMethod}
                                    >
                                        <SelectTrigger
                                            id='delivery-method'
                                            aria-label='Delivery time'
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='1-3 working days'>
                                                1-3 working days
                                            </SelectItem>
                                            <SelectItem value='2-4 working days'>
                                                2-4 working days
                                            </SelectItem>
                                            <SelectItem value='3-5 working days'>
                                                3-5 working days
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </label>
                            </div>
                        </section>

                        <section className='rounded-md bg-white p-md shadow-xs'>
                            <h2 className='text-lg font-semibold text-dark-charcoal'>
                                Pickup and reservation
                            </h2>
                            <div className='mt-md grid gap-md text-sm text-muted-foreground sm:grid-cols-3'>
                                <div>
                                    <span className='block text-xs'>Shop</span>
                                    <span className='font-medium text-dark-charcoal'>
                                        2ND HAND MARKET
                                    </span>
                                </div>
                                <div>
                                    <span className='block text-xs'>Location</span>
                                    <span className='font-medium text-dark-charcoal'>
                                        Online order
                                    </span>
                                </div>
                                <div>
                                    <span className='block text-xs'>Reservation</span>
                                    <span className='font-medium text-dark-charcoal'>
                                        2 days after confirmation
                                    </span>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className='h-fit rounded-md bg-white p-lg shadow-xs'>
                        <h2 className='text-lg font-semibold text-dark-charcoal'>Order summary</h2>
                        <div className='mt-lg flex flex-col gap-sm border-t border-gainsboro pt-md text-sm'>
                            <div className='flex justify-between gap-md'>
                                <span className='text-muted-foreground'>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className='flex justify-between gap-md'>
                                <span className='text-muted-foreground'>Shipping</span>
                                <span>{formatPrice(SHIPPING_COST)}</span>
                            </div>
                        </div>
                        <div className='mt-md flex items-center justify-between border-t border-gainsboro pt-md text-lg font-semibold text-dark-charcoal'>
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                        <Button
                            type='button'
                            variant={BUTTON_STYLE.FIRST}
                            size={BUTTON_SIZE.LARGE}
                            className='mt-lg w-full'
                            onClick={handleCheckout}
                            disabled={createOrderMutation.isPending}
                        >
                            {createOrderMutation.isPending ? 'Processing...' : 'Confirm order'}
                        </Button>
                    </aside>
                </div>
            )}
        </div>
    );
};
