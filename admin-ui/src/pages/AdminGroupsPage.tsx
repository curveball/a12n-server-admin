// src/pages/AdminGroupsPage.tsx

import React from 'react';
import {
  Theme,
  Flex,
  Box,
  Heading,
  Text,
  Card,
  Button,
  Avatar,
} from '@radix-ui/themes';

const mockGroups = [
  { name: 'test group 1', createdAt: '2025-02-15', modifiedAt: '2025-02-15', privileges: 'read' },
  { name: 'test group 2', createdAt: '2025-02-16', modifiedAt: '2025-02-16', privileges: 'read, update' },
  { name: 'test group 3', createdAt: '2025-02-17', modifiedAt: '2025-02-17', privileges: 'read, update, delete' },
];

export default function AdminGroupsPage() {
  return (
    <Theme accentColor="orange" radius="small">
      <Flex style={{ height: '100vh', overflow: 'hidden' }}>
        {/* SIDEBAR */}
        <Box style={styles.sidebar}>
          {/* Top brand section */}
          <Box style={{ marginBottom: '2rem' }}>
            <Heading as="h2" size="3" style={{ margin: 0 }}>
              a12n-server
            </Heading>
            <Text size="2" color="gray">
              Admin UI v1.0.0
            </Text>
          </Box>

          {/* Navigation */}
          <Box asChild style={{ flex: 1 }}>
            <nav>
              <Flex direction="column" gap="3">
                <SidebarItem label="Users" count="14" />
                <SidebarItem label="Groups" count="5" />
                <SidebarItem label="Apps" count="2" />
                <SidebarItem label="Tokens" count="1" />
                <SidebarItem label="Privileges" count="0" />
              </Flex>
            </nav>
          </Box>

          {/* Bottom profile panel */}
          <Box style={styles.profilePanel}>
            <Flex gap="2" align="center">
              <Avatar size="4" src="https://placekitten.com/40/40" fallback="EP" />
              <Box>
                <Text size="2" weight="bold">
                  Evert Pot
                </Text>
                <Text size="2" color="gray">
                  evert@sproutfamily.com
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* MAIN CONTENT */}
        <Flex direction="column" style={styles.mainContent}>
          {/* Documentation button at top-right */}
          <Box style={styles.docButtonWrapper}>
            <Button variant="outline" color="gray">
              Documentation
            </Button>
          </Box>

          {/* Header */}
          <Box style={{ marginBottom: '1rem' }}>
            <Heading as="h1" size="4" style={{ marginBottom: '4px' }}>
              Groups
            </Heading>
            <Text size="2" color="gray">
              View a list of all groups in the database below.
            </Text>
          </Box>

          {/* Card containing table & action bar */}
          <Card style={{ marginTop: '1rem', padding: '1rem' }}>
            {/* Action Bar */}
            <Flex justify="between" align="center" style={{ marginBottom: '1rem' }}>
              <Text size="2" weight="bold">

              </Text>
              <Flex gap="2">
                <Button variant="outline">Delete</Button>
                <Button variant="outline">Filters</Button>
                <Button variant="outline">Export</Button>
                <Button variant="solid" color="orange">
                  + New Group
                </Button>
              </Flex>
            </Flex>

            {/* Table */}
            <Box style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={{ ...styles.th, width: '40px' }} />
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Created</th>
                    <th style={styles.th}>Modified</th>
                    <th style={styles.th}>Privileges</th>
                  </tr>
                </thead>
                <tbody>
                  {mockGroups.map((group) => (
                    <tr key={group.name} style={styles.tr}>
                      <td style={{ ...styles.td, width: '40px' }}>
                        <input type="checkbox" />
                      </td>
                      <td style={styles.td}>{group.name}</td>
                      <td style={styles.td}>{group.createdAt}</td>
                      <td style={styles.td}>{group.modifiedAt}</td>
                      <td style={styles.td}>{group.privileges}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Card>
        </Flex>
      </Flex>
    </Theme>
  );
}

/** Sidebar item subcomponent */
function SidebarItem({ label, count }: { label: string; count: string }) {
  return (
    <Flex justify="between" align="center" style={{ cursor: 'pointer', fontSize: '1rem' }}>
      <Text>{label}</Text>
      <Box
        style={{
          backgroundColor: '#2d2d2d',
          borderRadius: '9999px',
          padding: '0 8px',
          fontSize: '0.75rem',
        }}
      >
        {count}
      </Box>
    </Flex>
  );
}

/** Inline styles for demonstration; adjust to your liking */
const styles: Record<string, React.CSSProperties> = {
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    borderBottom: '1px solid #eee',
    padding: '0.75rem',
    fontWeight: 'bold',
    backgroundColor: '#fafafa',
  },
  tr: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '0.75rem',
  },
};