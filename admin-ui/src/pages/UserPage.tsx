import React from 'react';
import { DeveloperTabContainer } from '@/components/DeveloperTab';

const UserPage: React.FC = () => {
  // If you need the token from .env, you can read it here:
  const myAccessToken = import.meta.env.VITE_ACCESS_TOKEN || 'NO_TOKEN_FOUND';

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Page Title */}
      <h1
        style={{
          fontSize: '1.5rem',
          marginBottom: '0.5rem',
          fontWeight: 600,
        }}
      >
        User Page
      </h1>

      {/* Subtext */}
      <p
        style={{
          color: '#555',
          marginBottom: '1.5rem',
          lineHeight: '1.4',
        }}
      >
        This page should display the fetched user list from your a12n-server.
      </p>

      {/* Main Container for DeveloperTab */}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#fff',
          padding: '1rem',
        }}
      >
        {/* If your DeveloperTabContainer expects a fetchUrl and token: */}
        <DeveloperTabContainer
          fetchUrl="/user?embed=item"
          token={myAccessToken}
        />
      </div>
    </div>
  );
};

export default UserPage;