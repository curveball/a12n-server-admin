// src/components/UserTable/UserTable.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const UserTable: React.FC = () => {
  const fetchUsers = async () => {
    const response = await fetch('/api/v1/users', {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['userTable'],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return <div>Loading users...</div>;
  }
  if (error) {
    return <div>Error loading users: {(error as Error).message}</div>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>User ID</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(data) &&
          data.map((user: any) => (
            <tr key={user.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.email}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};