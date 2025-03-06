import React from 'react';
import { Box, Flex, Heading, Text, Avatar, Badge, Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { GlobeIcon, PersonIcon, GridIcon, LockClosedIcon, GitHubLogoIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import AdminUILogo from '../assets/icons/admin-ui-logo.svg';

export default function Sidebar() {
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="260px"
            height="100vh"
            style={{
                backgroundColor: '#161215',
                color: 'var(--gray-12)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 16px'
            }}
        >
            {/* Brand Section */}
            <Box mb="6">
                <Flex align="center" justify="between">
                    <Flex align="center" gap="2">
                        <img src={AdminUILogo} alt="Admin UI Logo" style={{ width: '40px', borderRadius: '10px' }} /> {/* Updated border radius */}
                        <Box>
                            <Heading as="h2" size="4" weight="medium" style={{ color: '#DFCDC5' }}>
                                a12n-server
                            </Heading>
                            <Flex align="center" gap="1">
                                <Text size="2" style={{ color: '#DFCDC5BF' }}>Admin UI</Text>
                                <Badge color="orange" variant="solid" radius="large" size="1">
                                    v1.0.0
                                </Badge>
                            </Flex>
                        </Box>
                    </Flex>
                    <Button
                        variant="ghost"
                        size="2"
                        style={{ borderRadius: '8px', padding: '8px', marginRight: 'auto', marginLeft: '28px' }} // Adjusted marginLeft
                        onClick={() => window.open('https://github.com/curveball/a12n-server', '_blank')}
                    >
                        <GitHubLogoIcon color="#A18072" />
                    </Button>
                </Flex>
            </Box>

            {/* Navigation */}
            <Box asChild style={{ flex: 1 }}>
                <nav>
                    <Box as="ul" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {navItems.map(({ name, icon, count, path }) => (
                            <Box as="li" key={name} mb="2">
                                <Link
                                    to={path}
                                    style={{
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        backgroundColor: name === 'Users' ? '#8C6D5E' : 'transparent',
                                        color: name === 'Users' ? '#000000' : '#DFCDC5BF'
                                    }}
                                >
                                    <Flex align="center" gap="2">
                                        {React.cloneElement(icon, { color: name === 'Users' ? '#000000' : '#A18072' })}
                                        <Text size="3" weight="medium">
                                            {name}
                                        </Text>
                                    </Flex>
                                    {count !== null && (
                                        <Badge color="gray" variant="soft" size="1">
                                            {count}
                                        </Badge>
                                    )}
                                </Link>
                            </Box>
                        ))}
                    </Box>
                </nav>
            </Box>

            {/* Profile Section */}
            <Box pt="6" style={{ borderTop: '1px solid var(--gray-9)' }}>
                <Flex gap="2" align="center" justify="between">
                    <Flex gap="2" align="center">
                        <Avatar
                            size="3"
                            src="https://placekitten.com/40/40"
                            fallback="EP"
                            radius="large"
                        />
                        <Box>
                            <Flex align="center" gap="2">
                                <Text size="2" weight="bold" style={{ color: '#DFCDC5' }}>
                                    Evert Pot
                                </Text>
                                <Badge color="orange" variant="solid" size="1">
                                    Admin
                                </Badge>
                            </Flex>
                            <Text size="2" style={{ color: '#DFCDC5' }}>
                                evert.pot@gmail.com
                            </Text>
                        </Box>
                    </Flex>
                    <Button variant="ghost" size="2" style={{ borderRadius: '8px', padding: '8px', color: '#A18072' }}> {/* Updated hover style */}
                        <DotsVerticalIcon />
                    </Button>
                </Flex>
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