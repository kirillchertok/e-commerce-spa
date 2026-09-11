import { ChevronDownIcon, ChevronUpIcon } from '@/shared/constants/icons';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

import { SubCategoryNode } from './SubCategoryNode';
import type { CategoryNodeProps } from './types';

interface CategoryLabelProps {
    label: string;
    isSelected: boolean;
    onClick: () => void;
    size?: 'md' | 'sm';
}

const CategoryLabel = ({ label, isSelected, onClick, size = 'md' }: CategoryLabelProps) => (
    <Button
        variant={BUTTON_STYLE.LINK}
        size={BUTTON_SIZE.DEFAULT}
        onClick={onClick}
        className={cn(
            'flex-1 justify-start py-xs text-left font-medium text-dark-charcoal hover:text-gemma',
            size === 'md' ? 'text-md' : 'text-sm',
            isSelected && 'font-bold text-gemma'
        )}
    >
        {label}
    </Button>
);
export { CategoryLabel };

interface CategoryChevronProps {
    id: string;
    label: string;
    isExpanded: boolean;
    onToggle: (id: string) => void;
}

const CategoryChevron = ({ id, label, isExpanded, onToggle }: CategoryChevronProps) => (
    <Button
        variant={BUTTON_STYLE.ICON}
        size={BUTTON_SIZE.DEFAULT}
        onClick={() => onToggle(id)}
        aria-label={`Toggle ${label}`}
        className='border-0 text-matte-steel hover:text-dark-charcoal'
    >
        {isExpanded ? (
            <ChevronUpIcon className='h-4 w-4' />
        ) : (
            <ChevronDownIcon className='h-4 w-4' />
        )}
    </Button>
);
export { CategoryChevron };

export const CategoryNode = ({ node, context }: CategoryNodeProps) => {
    const { category, subCategory, expandedCategories, onToggle, onSelect } = context;
    const isExpanded = !!expandedCategories[node.id];
    const hasChildren = !!node.children?.length;
    const isSelected = category === node.label && !subCategory;

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
                <CategoryLabel
                    label={node.label}
                    isSelected={isSelected}
                    onClick={() => onSelect(node.label)}
                />
                {hasChildren ? (
                    <CategoryChevron
                        id={node.id}
                        label={node.label}
                        isExpanded={isExpanded}
                        onToggle={onToggle}
                    />
                ) : (
                    <ChevronDownIcon className='mr-sm h-4 w-4 text-matte-steel' />
                )}
            </div>

            {hasChildren && isExpanded && (
                <div className='ml-sm flex flex-col gap-xs border-l border-matte-steel pl-md'>
                    {node.children?.map(sub => (
                        <SubCategoryNode
                            key={sub.id}
                            node={sub}
                            parentLabel={node.label}
                            context={context}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

