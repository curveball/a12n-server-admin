import React from 'react';
import {
    Theme,
    Flex,
    Box,
    Heading,
    Text,
    Card,
    Button,
    Badge,
    Avatar,
} from '@radix-ui/themes';
import type { CSSProperties } from 'react';

const mockUsers = [
    { emailAddress: 'Jordane.Bednar@gmail.com', firstName: 'Santina', lastName: 'Kovacek', isActive: true },
    { emailAddress: 'Eve.Stoltenberg21@gmail.com', firstName: 'Elwin', lastName: 'Sanford', isActive: true },
    { emailAddress: 'Morton_Haag@yahoo.com', firstName: 'Elbert', lastName: 'Little', isActive: false },
];

export default function AdminUsersPage() {
    return (
        <Theme accentColor="orange" radius="small">
            <Flex style={{ height: '100vh', overflow: 'hidden' }}>
                {/* SIDEBAR */}
                <Box style={styles.sidebar}>
                    <Box style={{ marginBottom: '2rem' }}>
                        <Heading as="h2" size="3" style={{ margin: 0 }}>
                            a12n-server
                        </Heading>
                        <Text size="2" color="gray">Admin UI v1.0.0</Text>
                    </Box>
                    <Box asChild style={{ flex: 1 }}>
                        <nav>
                            <Flex direction="column" gap="3">
                                <SidebarItem label="Users" count="14" />
                                <SidebarItem label="Groups" count="5" />
                            </Flex>
                        </nav>
                    </Box>
                    <Box style={styles.profilePanel}>
                        <Flex gap="2" align="center">
                            <Avatar size="4" src="https://placekitten.com/40/40" fallback="EP" />
                            <Box>
                                <Text size="2" weight="bold">Evert Pot</Text>
                                <Text size="2" color="gray">evert@sproutfamily.com</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>

                {/* MAIN CONTENT */}
                <Flex direction="column" style={styles.mainContent}>
                    <Box style={styles.docButtonWrapper}>
                        <Button variant="outline" color="gray">Documentation</Button>
                    </Box>
                    <Box style={{ marginBottom: '1rem' }}>
                        <Heading as="h1" size="4">Users</Heading>
                        <Text size="2" color="gray">View a list of all users in the database below in JSON format.</Text>
                    </Box>
                    <Card style={{ marginTop: '1rem', padding: '1rem' }}>
                        <Box style={styles.tableWrapper}>
                            <pre style={styles.jsonDisplay}>
                                {JSON.stringify({ users: mockUsers }, null, 2)}
                            </pre>
                        </Box>
                    </Card>
                </Flex>
            </Flex>
        </Theme>
    );
}

function SidebarItem({ label, count }: { label: string; count: string }) {
    return (
        <Flex justify="between" align="center" style={{ cursor: 'pointer', fontSize: '1rem' }}>
            <Text>{label}</Text>
            <Box style={{ backgroundColor: '#2d2d2d', borderRadius: '9999px', padding: '0 8px', fontSize: '0.75rem' }}>
                {count}
            </Box>
        </Flex>
    );
}

const styles: Record<string, CSSProperties> = {
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
    mainContent: {
        flex: 1,
        overflowY: 'auto',
        padding: '1.5rem',
        position: 'relative',
    },
    docButtonWrapper: {
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
    },
    tableWrapper: {
        width: '100%',
        overflowX: 'auto',
    },
    jsonDisplay: {
        fontFamily: 'monospace',
        backgroundColor: '#2d2d2d',
        color: '#f8f8f2',
        padding: '1rem',
        borderRadius: '8px',
        overflowX: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
};
