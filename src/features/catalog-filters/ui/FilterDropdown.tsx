import type { FilterOption } from '@/shared/constants/filterOptions';
import { ChevronDownIcon } from '@/shared/constants/icons';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/Popover';

interface FilterDropdownProps {
    title: string;
    options: FilterOption[];
    selectedValues: string[];
    onToggle: (value: string) => void;
    className?: string;
}

interface FilterOptionItemProps {
    option: FilterOption;
    isChecked: boolean;
    onToggle: (value: string) => void;
}

const FilterOptionItem = ({ option, isChecked, onToggle }: FilterOptionItemProps) => (
    <label className='flex cursor-pointer items-center gap-sm rounded-sm px-sm py-xs text-sm text-dark-charcoal hover:bg-matte-steel'>
        <Checkbox
            checked={isChecked}
            onCheckedChange={() => onToggle(option.value)}
        />
        <span>{option.label}</span>
    </label>
);

export const FilterDropdown = ({
    title,
    options,
    selectedValues,
    onToggle,
    className,
}: FilterDropdownProps) => {
    const hasSelection = selectedValues.length > 0;

    return (
        <div className={cn('relative inline-block text-left', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={BUTTON_STYLE.FILTER}
                        size={BUTTON_SIZE.DEFAULT}
                        className={cn(hasSelection && 'border-gemma text-gemma')}
                    >
                        <span>{title}</span>
                        <ChevronDownIcon className='h-4 w-4' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align='start'
                    className='w-48 p-sm'
                >
                    <div className='max-h-48 space-y-xs overflow-y-auto'>
                        {options.map(option => (
                            <FilterOptionItem
                                key={option.value}
                                option={option}
                                isChecked={selectedValues.includes(option.value)}
                                onToggle={onToggle}
                            />
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

