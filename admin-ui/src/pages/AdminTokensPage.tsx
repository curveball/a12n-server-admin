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

// Need to clarify tokens later, for now we can have some demo data
const mockTokens = [
    { code: '2YotnFZFEjr1zCsicMWpAA', created: '2025-02-15', expired: '2025-02-16' },
    { code: 'tGzv3JOkF0XG5Qx2TlKWIA', created: '2025-02-16', expired: '2025-02-17' },
    { code: 'abc123def456ghi789', created: '2025-02-14', expired: '2025-02-15' },
    { code: '9A1B2C3D4E5F6G7H8I9J', created: '2025-02-12', expired: '2025-02-13' },
    { code: 'ZxYwVUtSrQpOnMlKjIhG', created: '2025-02-17', expired: '2025-02-18' }
];

export default function AdminTokensPage() {
  return (
    <Theme accentColor="orange" radius="small">
      <Flex style={{ height: '100vh', overflow: 'hidden' }}>

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
              Tokens
            </Heading>
            <Text size="2" color="gray">
              View a list of all tokens.
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
                  + New Token
                </Button>
              </Flex>
            </Flex>

            {/* Table */}
            <Box style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={{ ...styles.th, width: '40px' }} />
                    <th style={styles.th}>Token</th>
                    <th style={styles.th}>Created</th>
                    <th style={styles.th}>Expired</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTokens.map((token) => (
                    <tr key={token.code} style={styles.tr}>
                      <td style={{ ...styles.td, width: '40px' }}>
                        <input type="checkbox" />
                      </td>
                      <td style={styles.td}>{token.code}</td>
                      <td style={styles.td}>{token.created}</td>
                      <td style={styles.td}>{token.expired}</td>
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
