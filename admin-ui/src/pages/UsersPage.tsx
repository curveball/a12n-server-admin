// src/pages/UserPage.tsx
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { DeveloperTabContainer } from '@/components/DeveloperTab';

export default function UserPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Users</h1>
      <p>This page fetches users from /user (the a12n-server endpoint).</p>

      <Tabs.Root defaultValue="developer">
        <Tabs.List style={{ display: 'inline-flex', borderBottom: '1px solid #ccc' }}>
          <Tabs.Trigger value="table" style={{ padding: '0.5rem 1rem' }}>
            Table
          </Tabs.Trigger>
          <Tabs.Trigger value="developer" style={{ padding: '0.5rem 1rem' }}>
            Developer
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="table" style={{ padding: '1rem' }}>
          <p>Placeholder for a user table.</p>
        </Tabs.Content>

        <Tabs.Content value="developer" style={{ padding: '1rem' }}>
          {/* The fetchUrl defaults to /user, but you can override if needed. */}
          <DeveloperTabContainer
            fetchUrl="/user"
            token="YOUR_ADMIN_TOKEN"
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}