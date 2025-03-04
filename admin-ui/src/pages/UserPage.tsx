

import React from 'react';
import DeveloperTabComponent from '@/components/DeveloperTabComponent';

const UserPage: React.FC = () => {
  const myAccessToken = import.meta.env.VITE_ACCESS_TOKEN || 'NO_TOKEN_FOUND';

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1>User Page</h1>
      <DeveloperTabComponent fetchUrl="/user?embed=item" token={myAccessToken} />
    </div>
  );
};

export default UserPage;