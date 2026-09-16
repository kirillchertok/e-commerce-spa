import { mockProducts } from '../src/entities/product/__mocks__/mockProducts';
import { getAdminFirestore } from './firebaseAdmin';

const PRODUCTS_COLLECTION = 'products';

export const seedProducts = async () => {
    const db = getAdminFirestore();

    const batch = db.batch();

    mockProducts.forEach(product => {
        const productRef = db.collection(PRODUCTS_COLLECTION).doc(String(product.id));

        batch.set(productRef, product);
    });

    await batch.commit();

    console.log(`Products seeded successfully: ${mockProducts.length}`);
};
