import { mockOrders } from '../src/entities/order/__mocks__/mockOrders';
import { getAdminFirestore } from './firebaseAdmin';

const USER_ID = 'jIiVUup5kzTcsj0l8tcCHIhYcSy1';

const USERS_COLLECTION = 'users';
const ORDERS_COLLECTION = 'orders';

export const seedOrders = async () => {
    const db = getAdminFirestore();

    const batch = db.batch();

    const ordersCollection = db
        .collection(USERS_COLLECTION)
        .doc(USER_ID)
        .collection(ORDERS_COLLECTION);

    mockOrders.forEach(order => {
        const orderRef = ordersCollection.doc(order.id);

        batch.set(orderRef, {
            ...order,
            userId: USER_ID,
        });
    });

    await batch.commit();

    console.log(`Orders seeded successfully: ${mockOrders.length}`);
};
