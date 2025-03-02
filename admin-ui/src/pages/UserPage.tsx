// src/pages/UserPage.tsx
import React from 'react';
import { DeveloperTabContainer } from '@/components/DeveloperTab';

const UserPage: React.FC = () => {
  // Replace with your actual access token
      <h1>User Page</h1>
      const myAccessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJzY29wZSI6IiIsImNsaWVudF9pZCI6InN5c3RlbSIsImlhdCI6MTc0MDg3OTUyMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4NTMxIiwiYXVkIjoiL3N5c3RlbSIsInN1YiI6Ii91c2VyL0otSl9fMVpWSEo4IiwiZXhwIjoxNzQwODgwMTIxLCJqdGkiOiI1dUF4WDNiMDRGOUgzMVhlTlBHVC1qd0NpdTFfbU5xUWlHRWdxOHhIYmEwIn0.qQzYnQDckUEwhTYclO5fNas3jTiywpgvvPyJwGAcmpc6H-7OMcdsj60V-mZwNIkKUHTSGUKxZZYmam7pgdxpA2powujWoZZFfirElRQJm2jBcDUAhXnlmVZuAG2RbtdGXsQdAX8rgAfHZAZyR3bahXWzc01x87XfB2IEWD4GGOxlVzcVUzpxkUmzeEH7taYPr1Pl_vq-yOfUgqlvJIuWtTDF4XOg7zuID8k5F2pvvYIjcGTXT1tg1hwEeL0be9NFs8i50h5RZw7KH5T52p0RdOXye868fK7rTPMhcuXz7MDjhgcEX0tpfElzGm8pWLvqmnMEpSglw1vk2ouRlPnOq_nI0tmLaU2UUfe1u_hFFOqrDMD5jS4XFQzmonUPY7Kkct7NxA5IwF04KSha18h7jBN6E-pVQnJXTuSqzPtv8e18B7a8g7ES6AG-dwsNCf2y3v5VboVvBqiH8Yk0cQ72RxgRZ4TZlyPRsh0gHy1r31QRAlbug4iYE96J4JAJ7Tkt6S32tjSQKwoPus60_M5f4BsjtKShovc94y1vQ8ivzz-2gukyL0CtGJUMLfctWzKuhRO5iWimGBX7DJjeyof0CAVas32IUMhfIA7MJM4u-C7i0T57wu-Ikd1BsBlO5FVwSSU3w9wJmkDmBQHO_76wghTNxHU6MhyxxogPeos9-iI";
  return (
    <div style={{ padding: '2rem', border: '2px solid blue', backgroundColor: '#fafafa' }}>
      <h1>User Page</h1>
      <p>This page should display the fetched user list from your a12n-server.</p>
      <DeveloperTabContainer fetchUrl="/user?embed=item" token={myAccessToken} />
    </div>
  );
};

export default UserPage;