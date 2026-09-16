import { Outlet } from '@tanstack/react-router';

import { ProtectedRoute } from '@/features/auth/ui/ProtectedRoute';
import { CategoryNavigation } from '@/widgets/CategoryNavigation';
import { ChatWidget } from '@/widgets/Chat/ChatWidget';
import { Header } from '@/widgets/Header';

export const ShopLayout = () => {
    return (
        <ProtectedRoute>
            <div className='flex min-h-screen flex-col overflow-x-hidden bg-matte-steel/30 font-sans text-dark-charcoal antialiased'>
                <Header />
                <CategoryNavigation />
                <main className='flex-1'>
                    <Outlet />
                </main>
                <ChatWidget />
            </div>
        </ProtectedRoute>
    );
};
