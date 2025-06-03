import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import React from 'react';

interface DropdownSelectorProps {
    options: string[];
    selectedOption: string;
    onSelectionChange: (type: string) => void;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ selectedOption, options, onSelectionChange }) => (
    <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
            <Button className='text-white text-sm font-semibold items-center gap-x-2' color='orange'>
                {selectedOption}
                <ChevronDownIcon width={15} height={15} />
            </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
            <DropdownMenu.Content className='bg-white border border-gray-300 rounded-md p-2 shadow-md'>
                {options.map((option) => (
                    <DropdownMenu.Item
                        key={option}
                        onClick={() => onSelectionChange(option as string)}
                        className='p-2 cursor-pointer rounded-md text-sm capitalize'
                    >
                        {option}
                    </DropdownMenu.Item>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
);

export default DropdownSelector;
