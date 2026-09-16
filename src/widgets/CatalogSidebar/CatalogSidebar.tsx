import { CategoryAccordion } from './CategoryAccordion';

export const CatalogSidebar = ({ className }: { className?: string }) => {
    return (
        <aside className={className}>
            <div className='flex flex-col'>
                <h2 className='mb-md text-sm font-semibold tracking-wider text-muted-foreground uppercase'>
                    Categories
                </h2>
                <CategoryAccordion />
            </div>
        </aside>
    );
};

