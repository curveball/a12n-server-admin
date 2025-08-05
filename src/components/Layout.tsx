import { Flex, Theme } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import packageJson from '../../package.json';
import useServerStats from '../hooks/useServerStats';
import { ServerStats } from '../types/models';
import { Sidebar } from './Sidebar';

export default function Layout() {
    const version = packageJson.version;
    const { data: stats, isLoading, refetch } = useServerStats();
    const [serverStats, setServerStats] = useState<ServerStats | undefined>(stats);

    useEffect(() => {
        if (!stats || isLoading) return;
        refetch();
        setServerStats(stats);
    }, [stats, isLoading, refetch]);

    return (
        <Theme accentColor='orange' radius='small'>
            <Flex style={{ height: '100vh', overflow: 'hidden', marginLeft: '260px' }}>
                <Sidebar version={version} serverStats={serverStats} />
                <Flex direction='column' style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    <Outlet />
                </Flex>
            </Flex>
        </Theme>
    );
}
