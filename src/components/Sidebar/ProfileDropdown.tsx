import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button, DropdownMenu, Text } from '@radix-ui/themes';

type ProfileDropdownProps = {
    profileOptions: {
        label: string;
        onClick: () => void;
    }[];
};

export default function ProfileDropdown({ profileOptions }: ProfileDropdownProps) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className='IconButton' aria-label='Profile Options'>
                <Button variant='ghost' size='2' className='rounded-lg p-2 text-gray-500'>
                    <DotsVerticalIcon className='w-4 h-4' />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className='DropdownMenuContent' side='bottom'>
                {profileOptions.map((option) => (
                    <DropdownMenu.Item
                        key={option.label}
                        data-testid={option.label}
                        className='cursor-pointer'
                        onClick={option.onClick}
                    >
                        <Text>{option.label}</Text>
                    </DropdownMenu.Item>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
