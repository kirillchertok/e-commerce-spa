import { Outlet } from '@tanstack/react-router';

import { Button } from '@/shared/ui/Button/Button';
import { Header } from '@/widgets/Header/Header';

export const ShopLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <div>
                    <Button>Action</Button>
                    <Button>Action</Button>
                    <Button>Action</Button>
                    <Button>Action</Button>
                    <Button>Action</Button>
                </div>
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
