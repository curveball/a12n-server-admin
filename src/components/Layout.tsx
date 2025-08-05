import { GlobeIcon, GridIcon, PersonIcon, RocketIcon } from '@radix-ui/react-icons';
import { Flex, Theme } from '@radix-ui/themes';
import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import packageJson from '../../package.json';
import useServerStats from '../hooks/useServerStats';
import { CLIENT_ROUTES } from '../routes';
import { Sidebar } from './Sidebar';
import type { NavItem } from './Sidebar/Sidebar';

export default function Layout() {
    const version = packageJson.version;
    const { data: stats, isLoading, refetch } = useServerStats();
    const [serverStats, setServerStats] = useState(stats);

    useEffect(() => {
        if (!stats || isLoading) return;
        refetch();
        setServerStats(stats);
    }, [stats, isLoading, refetch]);

    const navItems = useMemo<NavItem[]>(
        () => [
            { name: 'Users', icon: <PersonIcon />, count: serverStats?.stats?.user, path: CLIENT_ROUTES.USERS_TABLE },
            { name: 'Groups', icon: <GlobeIcon />, count: serverStats?.stats?.group, path: CLIENT_ROUTES.GROUPS_TABLE },
            { name: 'Apps', icon: <GridIcon />, count: serverStats?.stats?.app, path: CLIENT_ROUTES.APPS_TABLE },
            {
                name: 'Sandbox',
                icon: <RocketIcon />,
                count: serverStats?.stats?.user,
                path: CLIENT_ROUTES.USERS_SANDBOX,
            },
        ],
        [serverStats],
    );

    return (
        <Theme accentColor='orange' radius='small'>
            <Flex style={{ height: '100vh', overflow: 'hidden', marginLeft: '260px' }}>
                <Sidebar version={version} navItems={navItems} />
                <Flex direction='column' style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    <Outlet />
                </Flex>
            </Flex>
        </Theme>
    );
}
