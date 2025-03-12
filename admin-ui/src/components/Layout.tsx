import React from 'react';
import { Theme, Flex } from '@radix-ui/themes';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
export default function Layout() {
    return (
        <Theme accentColor='orange' radius='small'>
            <Flex style={{ height: '100vh', overflow: 'hidden', marginLeft: '260px' }}>
                <Sidebar />
                <Flex direction='column' style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    <Outlet />
                </Flex>
            </Flex>
        </Theme>
    );
}
