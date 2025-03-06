// src/pages/DeveloperTabPage.tsx
import React from 'react';
import DeveloperTabComponent from '@/components/DeveloperTabComponent';

function DeveloperTabPage() {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8531';
  const token = import.meta.env.VITE_ACCESS_TOKEN || 'NO_TOKEN_FOUND';

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Developer Tab Page</h1>
      <DeveloperTabComponent
        fetchUrl="/user?embed=item"
        token={token}
        baseUrl={baseUrl}
      />
    </div>
  );
}

export default DeveloperTabPage;