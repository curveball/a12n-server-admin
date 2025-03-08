import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Flex, Heading, Text, Avatar, Badge, Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import {
    GlobeIcon,
    PersonIcon,
    GridIcon,
    LockClosedIcon,
    GitHubLogoIcon,
    DotsVerticalIcon,
} from '@radix-ui/react-icons';
import AdminUILogo from '../assets/icons/admin-ui-logo.svg';

export default function Sidebar() {
    const location = useLocation();

    return (
        <Box
            position='fixed'
            top='0'
            left='0'
            width='260px'
            height='100vh'
            style={{
                backgroundColor: '#161215',
                color: 'var(--gray-12)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 16px',
            }}
        >
            <Box mb='6'>
                <Flex align='center' justify='start'>
                    <Flex align='center' gap='2'>
                        <img src={AdminUILogo} alt='Admin UI Logo' style={{ width: '40px', borderRadius: '10px' }} />
                        <Box>
                            <Heading as='h2' size='4' weight='medium' style={{ color: '#DFCDC5' }}>
                                a12n-server
                            </Heading>
                            <Flex align='center' gap='1'>
                                <Text size='2' style={{ color: '#DFCDC5BF' }}>
                                    Admin UI
                                </Text>
                                <Badge radius='large' size='1' style={{ backgroundColor: '#AB6400', color: 'white' }}>
                                    v1.0.0
                                </Badge>
                            </Flex>
                        </Box>
                    </Flex>
                    <Box
                        style={{
                            borderRadius: '8px',
                            border: '1px solid var(--bronze-12)',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            marginLeft: '34px',
                        }}
                    >
                        <Button
                            variant='ghost'
                            size='2'
                            style={{ padding: '0', margin: '0', width: '100%', height: '100%', borderRadius: '6px' }}
                            onClick={() => window.open('https://github.com/curveball/a12n-server', '_blank')}
                        >
                            <GitHubLogoIcon color='#A18072' width={18} height={18} />
                        </Button>
                    </Box>
                </Flex>
            </Box>

            <Box asChild style={{ flex: 1 }}>
                <nav>
                    <Box as='ul' style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {navItems.map(({ name, icon, count, path }) => {
                            const isActive = location.pathname.startsWith(path);
                            return (
                                <Box as='li' key={name} mb='2'>
                                    <Link
                                        to={path}
                                        style={{
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '8px 10px',
                                            borderRadius: '10px',
                                            backgroundColor: isActive ? '#8C6D5E' : 'transparent',
                                            color: isActive ? '#000000' : '#A18072',
                                        }}
                                    >
                                        <Flex align='center' gap='2'>
                                            {React.cloneElement(icon, {
                                                color: isActive ? '#000000' : '#A18072',
                                                width: 18,
                                                height: 18,
                                            })}
                                            <Text
                                                weight='medium'
                                                style={{
                                                    fontSize: '15px',
                                                    color: isActive ? 'var(--mauve-12)' : 'var(--bronze-9)',
                                                }}
                                            >
                                                {name}
                                            </Text>
                                        </Flex>
                                        {count !== null && (
                                            <Box
                                                style={{
                                                    borderRadius: '7px',
                                                    border: `1px solid ${isActive ? 'var(--bronze-12)' : '#A18072'}`,
                                                    width: '28px',
                                                    height: '26px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    color: isActive ? '#000000' : '#A18072',
                                                }}
                                            >
                                                {count}
                                            </Box>
                                        )}
                                    </Link>
                                </Box>
                            );
                        })}
                    </Box>
                </nav>
            </Box>

            <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '22px' }}>
                <Flex gap='2' align='center'>
                    <Avatar size='3' src='https://placekitten.com/40/40' fallback='EP' radius='large' />
                    <Box style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        <Flex align='center' gap='2'>
                            <Text size='2' style={{ fontWeight: 500, color: '#DFCDC5', marginBottom: '-2px' }}>
                                Evert Pot
                            </Text>
                            <Badge
                                style={{
                                    width: '32px',
                                    height: '15px',
                                    backgroundColor: '#CC4E00',
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontSize: '8px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                Admin
                            </Badge>
                        </Flex>
                        <Text size='2' style={{ color: '#DFCDC5BF' }}>
                            evert.pot@gmail.com
                        </Text>
                    </Box>
                </Flex>
                <Button variant='ghost' size='2' style={{ borderRadius: '8px', padding: '8px', color: '#A18072' }}>
                    <DotsVerticalIcon style={{ width: '16px', height: '16px' }} />
                </Button>
            </Box>
        </Box>
    );
}

const navItems = [
    { name: 'Users', icon: <PersonIcon />, count: 14, path: '/users' },
    { name: 'Groups', icon: <GlobeIcon />, count: 5, path: '/groups' },
    { name: 'Apps', icon: <GridIcon />, count: 2, path: '/apps' },
    { name: 'Privileges', icon: <LockClosedIcon />, count: 0, path: '/privileges' },
];
