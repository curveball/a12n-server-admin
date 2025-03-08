import React from 'react';
import DeveloperTabComponent from '../components/DeveloperTabComponent';

function DeveloperTabPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Developer Tab Page</h1>
      <DeveloperTabComponent />
    </div>
  );
}

export default DeveloperTabPage;