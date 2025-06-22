import { GlobeIcon, GridIcon, PersonIcon, RocketIcon } from '@radix-ui/react-icons';
import { Flex, Theme } from '@radix-ui/themes';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import packageJson from '../../package.json';
import { CLIENT_ROUTES } from '../routes';
import { Sidebar } from './Sidebar';
import type { NavItem } from './Sidebar/Sidebar';

export default function Layout() {
    const version = packageJson.version;
    // FIXME: count on navItem should be dynamic
    const navItems = useMemo<NavItem[]>(
        () => [
            { name: 'Users', icon: <PersonIcon />, count: 14, path: CLIENT_ROUTES.USERS_TABLE },
            { name: 'Groups', icon: <GlobeIcon />, count: 5, path: CLIENT_ROUTES.GROUPS_TABLE },
            { name: 'Apps', icon: <GridIcon />, count: 2, path: CLIENT_ROUTES.APPS_TABLE },
            { name: 'Sandbox', icon: <RocketIcon />, count: 0, path: CLIENT_ROUTES.USERS_SANDBOX },
        ],
        [],
    );

    const profileOptions = [
        {
            label: 'Logout',
            onClick: () => {
                console.log('Logout');
            },
        },
    ];
    return (
        <Theme accentColor='orange' radius='small'>
            <Flex style={{ height: '100vh', overflow: 'hidden', marginLeft: '260px' }}>
                <Sidebar version={version} navItems={navItems} profileOptions={profileOptions} />
                <Flex direction='column' style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    <Outlet />
                </Flex>
            </Flex>
        </Theme>
    );
}
