import { seedOrders } from './seedOrders';
import { seedProducts } from './seedProducts';

const seedFirestore = async () => {
    console.log('Starting Firestore seed...');

    await seedProducts();

    await seedOrders();

    console.log('Firestore seed completed successfully.');
};

seedFirestore()
    .then(() => {
        process.exit(0);
    })
    .catch(error => {
        console.error('Firestore seed failed:', error);

        process.exit(1);
    });
