import type { Product } from '@/entities/product/types/product.types';

import { ProductGallery } from './ProductGallery';
import { ProductInformation } from './ProductInformation';
import { ProductPurchase } from './ProductPurchase';

interface ProductDetailsProps {
    product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
    return (
        <div className='grid grid-cols-1 gap-lg lg:grid-cols-2 lg:gap-xl'>
            <ProductGallery product={product} />
            <div className='flex flex-col gap-lg rounded-md bg-white p-md shadow-xs md:p-lg'>
                <ProductInformation product={product} />
                <ProductPurchase
                    key={String(product.id)}
                    product={product}
                />
            </div>
        </div>
    );
};
