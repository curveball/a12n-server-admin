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
} from '@radix-ui/themes';
import { Link } from 'react-router-dom';

// Mock data for existing apps
const mockApps = [
  {
    name: 'Google Authenticator',
    url: 'https://google.com/auth',
    createdAt: '2022-10-01',
    status: 'Active',
  },
  {
    name: 'Slack',
    url: 'https://slack.com',
    createdAt: '2023-01-15',
    status: 'Active',
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    createdAt: '2022-11-20',
    status: 'Inactive',
  },
];

export default function AppsListPage() {
  return (
    <Theme accentColor="orange" radius="small">
      <Flex direction="column" style={{ height: '100vh', padding: '1rem', overflowY: 'auto' }}>
        {/* Page Header */}
        <Box style={{ marginBottom: '1rem' }}>
          <Heading as="h1" size="4" style={{ marginBottom: '4px' }}>
            Apps
          </Heading>
          <Text size="2" color="gray">
            View a list of existing apps integrated with your server.
          </Text>
        </Box>

        {/* Main Card */}
        <Card style={{ padding: '1rem', marginTop: '1rem', position: 'relative' }}>
          {/* Action Bar */}
          <Flex justify="end" align="center" style={{ marginBottom: '1rem' }}>
            <Button variant="solid" color="orange" asChild>
              <Link to="/apps/create">+ New App</Link>
            </Button>
          </Flex>

          {/* Table */}
          <Box style={{ width: '100%', overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>URL</th>
                  <th style={styles.th}>Created</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}></th> {/* For "Manage" button */}
                </tr>
              </thead>
              <tbody>
                {mockApps.map((app) => (
                  <tr key={app.name} style={styles.tr}>
                    <td style={styles.td}>{app.name}</td>
                    <td style={styles.td}>
                      <a href={app.url} target="_blank" rel="noreferrer" style={styles.link}>
                        {app.url}
                      </a>
                    </td>
                    <td style={styles.td}>{app.createdAt}</td>
                    <td style={styles.td}>
                      {app.status === 'Active' ? (
                        <Badge color="green">Active</Badge>
                      ) : (
                        <Badge color="gray">Inactive</Badge>
                      )}
                    </td>
                    <td style={styles.td}>
                      <Button variant="outline" color="gray" size="2">
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Card>
      </Flex>
    </Theme>
  );
}

const styles = {
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
  link: {
    color: '#2680eb',
    textDecoration: 'none',
  },
};