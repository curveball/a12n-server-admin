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
            <DropdownMenu.Trigger>
                <Button variant='ghost' size='2' className='rounded-lg p-2 text-gray-500'>
                    <DotsVerticalIcon className='w-4 h-4' />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align='start'>
                {profileOptions.map((option) => (
                    <DropdownMenu.Item key={option.label} className='cursor-pointer'>
                        <Text onClick={option.onClick}>{option.label}</Text>
                    </DropdownMenu.Item>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
