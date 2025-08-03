import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button, DropdownMenu, Text } from '@radix-ui/themes';
import useOAuth from '../../hooks/useOAuth';

type ProfileDropdownProps = {
    profileOptions: {
        label: string;
        onClick: () => void;
    }[];
};

export default function ProfileDropdown({ profileOptions }: ProfileDropdownProps) {
    const { setTokens } = useOAuth();

    const handleLogout = async () => {
        setTokens({
            accessToken: '',
            refreshToken: '',
            expiresAt: 0,
        });

        window.location.href = import.meta.env.VITE_AUTH_SERVER_URL + '/logout';
    };
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button variant='ghost' size='2' className='rounded-lg p-2 text-gray-500'>
                    <DotsVerticalIcon className='w-4 h-4' />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align='end'>
                {profileOptions.map((option) => (
                    <DropdownMenu.Item key={option.label} className='cursor-pointer'>
                        <Text onClick={option.onClick}>{option.label}</Text>
                    </DropdownMenu.Item>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
