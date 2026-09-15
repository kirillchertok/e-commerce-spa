import type { Product } from '../types/product.types';

export function getProductImages(product: Product): string[] {
    if (product.images && product.images.length > 0) {
        return product.images;
    }

    return [product.image];
}
