import React from 'react';
import { Theme, Flex, Box, Heading, Text, Avatar, Badge, Button } from '@radix-ui/themes';
import { Link, Outlet } from 'react-router-dom';
import { GlobeIcon, PersonIcon, GridIcon, Link2Icon, LockClosedIcon, GitHubLogoIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import AdminUILogo from './assets/icons/admin-ui-logo.svg';

export default function Layout() {
  return (
    <Theme accentColor="orange" radius="small">
      <Flex style={{ height: '100vh', overflow: 'hidden', marginLeft: '260px' }}>
        <Sidebar />
        <Flex direction="column" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          <Outlet />
        </Flex>
      </Flex>
    </Theme>
  );
}

function Sidebar() {
  return (
    <Box style={styles.sidebar}>
      <Box style={styles.brandSection}>
        <Flex align="center" justify="between">
          <Flex align="center" gap="2">
            <Box style={styles.brandIcon}>
              <img src={AdminUILogo} alt="Admin UI Logo" />
            </Box>
            <Box>
              <Heading as="h2" size="4" style={styles.brandTitle}>
                a12n-server
              </Heading>
              <Flex align="center" gap="1">
                <Text size="2" style={styles.subHeader}>Admin UI</Text>
                <Badge color="orange" style={styles.versionBadge}>v1.0.0</Badge>
              </Flex>
            </Box>
          </Flex>
          <Button variant="ghost" size="icon" style={styles.githubButton} onClick={() => window.open('https://github.com/curveball/a12n-server', '_blank')}>
            <GitHubLogoIcon color="#A18072" />
          </Button>
        </Flex>
      </Box>

      <Box asChild style={{ flex: 1 }}>
        <nav>
          <ul style={styles.navList}>
            {navItems.map(({ name, icon, count, path }) => (
              <li key={name} style={styles.navItem}>
                <Link to={path} style={{ ...styles.navLink, ...(name === 'Users' ? styles.activeNavLink : {}) }}>
                  <Flex align="center" justify="between" style={{ width: '100%' }}>
                    <Flex align="center" gap="2">
                      {icon}
                      <span style={{ color: name === 'Users' ? '#000000' : '#A18072' }}>{name}</span>
                    </Flex>
                    {count !== null && <Badge color="gray" variant="soft">{count}</Badge>}
                  </Flex>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Box>

      <Box style={styles.profilePanel}>
        <Flex gap="2" align="center" justify="between">
          <Flex gap="2" align="center">
            <Avatar size="4" src="https://placekitten.com/40/40" fallback="EP" style={styles.avatar} />
            <Box>
              <Text size="2" weight="bold" style={styles.profileName}>
                Evert Pot <Badge color="orange" size="1" style={styles.adminBadge}>Admin</Badge> {/* Updated badge */}
              </Text>
              <Text size="2" color="gray" style={styles.profileEmail}>
                evert.pot@gmail.com
              </Text>
            </Box>
          </Flex>
          <Button variant="ghost" size="icon">
            <DotsVerticalIcon />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

const navItems = [
  { name: 'Users', icon: <PersonIcon />, count: 14, path: '/users' },
  { name: 'Groups', icon: <GlobeIcon />, count: 5, path: '/groups' },
  { name: 'Apps', icon: <GridIcon />, count: 2, path: '/apps' },
  { name: 'Tokens', icon: <Link2Icon />, count: 1, path: '/tokens' },
  { name: 'Privileges', icon: <LockClosedIcon />, count: 0, path: '/privileges' },
];

const styles = {
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '260px',
    height: '100vh',
    backgroundColor: '#1a1a1e',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem 1rem',
    boxSizing: 'border-box',
  },
  brandSection: {
    marginBottom: '2.5rem',
  },
  brandTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  subHeader: {
    fontSize: '1rem',
    color: '#DFCDC5BF',
  },
  versionBadge: {
    fontSize: '0.75rem',
    borderRadius: '0.5rem',
    backgroundColor: '#AB6400',
    color: '#ffffff',
  },
  githubButton: {
    outline: 'none',
    border: '1px solid #A18072',
    borderRadius: '8px',
    padding: '0.25rem',
    marginLeft: '-0.5rem',
    '&:focus': {
      boxShadow: '0 0 0 2px #A18072',
    },
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginBottom: '0.5rem',
  },
  navLink: {
    color: '#A18072',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'block',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    transition: 'background 0.2s ease-in-out',
  },
  activeNavLink: {
    backgroundColor: '#A18072',
    color: '#000000',
  },
  profilePanel: {
    marginTop: 'auto',
    paddingTop: '1.5rem',
    borderTop: '1px solid #333',
  },
  avatar: {
    borderRadius: '50%',
  },
  profileName: {
    fontSize: '0.9375rem',
  },
  profileEmail: {
    fontSize: '0.8125rem',
    color: '#bbb',
  },
  adminBadge: {
    backgroundColor: '#CC4E00',
    color: '#ffffff',
  },
};
