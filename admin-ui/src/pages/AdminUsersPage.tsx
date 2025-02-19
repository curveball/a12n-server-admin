// src/pages/AdminUsersPage.tsx

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

const mockUsers = [
  { emailAddress: 'Jordane.Bednar@gmail.com', firstName: 'Santina', lastName: 'Kovacek', isActive: true },
  { emailAddress: 'Eve.Stoltenberg21@gmail.com', firstName: 'Elwin', lastName: 'Sanford', isActive: true },
  { emailAddress: 'Morton_Haag@yahoo.com', firstName: 'Elbert', lastName: 'Little', isActive: false },
  { emailAddress: 'Sheridan.Hegmann@gmail.com', firstName: 'Susanna', lastName: 'Koch', isActive: true },
  { emailAddress: 'Korbin48@hotmail.com', firstName: 'Roberto', lastName: 'Hirthe', isActive: false },
  { emailAddress: 'Imani.Rolfson0@gmail.com', firstName: 'Mafalda', lastName: 'Feeney', isActive: true },
  { emailAddress: 'Jordy24@hotmail.com', firstName: 'Kyla', lastName: 'McCullough', isActive: true },
  { emailAddress: 'Brooke_Hansen@gmail.com', firstName: 'Kaia', lastName: 'Stokes', isActive: false },
  { emailAddress: 'Jennie_Purdy@yahoo.com', firstName: 'Elinor', lastName: 'Bergnaum', isActive: true },
  { emailAddress: 'Clay31@yahoo.com', firstName: 'Sherwood', lastName: 'Howe', isActive: true },
  { emailAddress: 'Forest_Wolf37@gmail.com', firstName: 'Reba', lastName: 'Gusikowski', isActive: false },
  { emailAddress: 'Javkayla.Orn@yahoo.com', firstName: 'Will', lastName: 'Cummerata', isActive: true },
  { emailAddress: 'Minerva54@yahoo.com', firstName: 'Ried', lastName: 'Wolber', isActive: true },
];

export default function AdminUsersPage() {
  return (
    <Theme accentColor="orange" radius="small">
      {/* Full-height container if desired */}
      <Flex direction="column" style={{ height: '100vh', overflow: 'auto', position: 'relative', padding: '1.5rem' }}>
        {/* Documentation button at top-right */}
        <Box style={styles.docButtonWrapper}>
          <Button variant="outline" color="gray">
            Documentation
          </Button>
        </Box>

        {/* Header */}
        <Box style={{ marginBottom: '1rem' }}>
          <Heading as="h1" size="4" style={{ marginBottom: '4px' }}>
            Users
          </Heading>
          <Text size="2" color="gray">
            View a list of all users in the database below.
          </Text>
        </Box>

        {/* Card containing table & action bar */}
        <Card style={{ marginTop: '1rem', padding: '1rem' }}>
          {/* Action Bar */}
          <Flex justify="between" align="center" style={{ marginBottom: '1rem' }}>
            <Text size="2" weight="bold">
              6 users selected
            </Text>
            <Flex gap="2">
              <Button variant="outline">Delete</Button>
              <Button variant="outline">Filters</Button>
              <Button variant="outline">Export</Button>
              <Button variant="solid" color="orange">
                + New user
              </Button>
            </Flex>
          </Flex>

          {/* Table */}
          <Box style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, width: '40px' }} />
                  <th style={styles.th}>emailAddress</th>
                  <th style={styles.th}>firstName</th>
                  <th style={styles.th}>lastName</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr key={user.emailAddress} style={styles.tr}>
                    <td style={{ ...styles.td, width: '40px' }}>
                      <input type="checkbox" />
                    </td>
                    <td style={styles.td}>{user.emailAddress}</td>
                    <td style={styles.td}>{user.firstName}</td>
                    <td style={styles.td}>{user.lastName}</td>
                    <td style={styles.td}>
                      {user.isActive ? (
                        <Badge color="green">Active</Badge>
                      ) : (
                        <Badge color="gray">Inactive</Badge>
                      )}
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

// Inline styles for demonstration; adjust as needed
const styles: Record<string, React.CSSProperties> = {
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