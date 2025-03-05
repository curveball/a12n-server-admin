import React from 'react';
import { Theme, Flex, Box, Heading, Text, Avatar } from '@radix-ui/themes';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <Theme accentColor='orange' radius='small'>
            {/* Outer Flex container: sidebar (left) + main content (right) */}
            <Flex style={{ height: '100vh', overflow: 'hidden' }}>
                <Sidebar />

                {/* Main content area: uses <Outlet> to render the child route's component */}
                <Flex direction='column' style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    <Outlet />
                </Flex>
            </Flex>
        </Theme>
    );
}

function Sidebar() {
    return (
        <Box style={styles.sidebar}>
            {/* Top brand section */}
            <Box style={{ marginBottom: '2rem' }}>
                <Heading as='h2' size='3' style={{ margin: 0 }}>
                    a12n-server
                </Heading>
                <Text size='2' color='gray'>
                    Admin UI v1.0.0
                </Text>
            </Box>

            {/* Navigation Links */}
            <Box asChild style={{ flex: 1 }}>
                <nav>
                    <ul style={styles.navList}>
                        <li style={styles.navItem}>
                            <Link to='/users' style={styles.navLink}>
                                Users
                            </Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to='/groups' style={styles.navLink}>
                                Groups
                            </Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to='/apps' style={styles.navLink}>
                                Apps
                            </Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to='/tokens' style={styles.navLink}>
                                Tokens
                            </Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to='/privileges' style={styles.navLink}>
                                Privileges
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Box>

            {/* Bottom profile panel (optional) */}
            <Box style={styles.profilePanel}>
                <Flex gap='2' align='center'>
                    <Avatar size='4' src='https://placekitten.com/40/40' fallback='EP' />
                    <Box>
                        <Text size='2' weight='bold'>
                            Evert Pot
                        </Text>
                        <Text size='2' color='gray'>
                            evert@sproutfamily.com
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}

const styles = {
    sidebar: {
        width: '240px',
        backgroundColor: '#1f1f1f',
        color: '#fff',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
    },
    profilePanel: {
        marginTop: 'auto',
        paddingTop: '1rem',
        borderTop: '1px solid #333',
    },
    navList: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    navItem: {
        marginBottom: '1rem',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
    },
};
