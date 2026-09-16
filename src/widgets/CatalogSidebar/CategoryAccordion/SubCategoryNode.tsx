import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

import { CategoryChevron, CategoryLabel } from './CategoryNode';
import type { SubCategoryNodeProps } from './types';

export const SubCategoryNode = ({ node, parentLabel, context }: SubCategoryNodeProps) => {
    const { category, subCategory, expandedCategories, onToggle, onSelect } = context;
    const isExpanded = !!expandedCategories[node.id];
    const hasChildren = !!node.children?.length;
    const isSelected = category === parentLabel && subCategory === node.label;
    const handleSelect = () => onSelect(parentLabel, node.label);
    const handleSelectSubSub = (event: React.MouseEvent<HTMLButtonElement>) => {
        onSelect(parentLabel, event.currentTarget.dataset.label ?? '');
    };

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
                <CategoryLabel
                    label={node.label}
                    size='sm'
                    isSelected={isSelected}
                    onClick={handleSelect}
                />
                {hasChildren && (
                    <CategoryChevron
                        id={node.id}
                        label={node.label}
                        isExpanded={isExpanded}
                        onToggle={onToggle}
                    />
                )}
            </div>

            {hasChildren && isExpanded && (
                <div className='flex flex-col gap-xs py-xs pl-md'>
                    {node.children?.map(subSub => (
                        <Button
                            key={subSub.id}
                            variant={BUTTON_STYLE.LINK}
                            size={BUTTON_SIZE.DEFAULT}
                            onClick={handleSelectSubSub}
                            data-label={subSub.label}
                            className={cn(
                                'justify-start py-xs text-left text-sm text-muted-foreground hover:text-gemma',
                                subCategory === subSub.label && 'font-semibold text-gemma'
                            )}
                        >
                            {subSub.label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};
