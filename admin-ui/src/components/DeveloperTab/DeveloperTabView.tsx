// src/components/developer/DeveloperTabView.tsx
import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';

interface DeveloperTabViewProps {
  fetchUrl: string;
  token: string;
  queryResult: UseQueryResult<any>;
}

const DeveloperTabView: React.FC<DeveloperTabViewProps> = ({ fetchUrl, token, queryResult }) => {
  const { data, error, isLoading, isFetching, refetch } = queryResult;
  console.log('DeveloperTabView: Rendered, data:', data);

  return (
    <div style={{ border: '2px dashed green', padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <h2>Request</h2>
      <pre style={{ fontFamily: 'monospace', margin: 0 }}>
{`GET ${fetchUrl}
curl '${fetchUrl}' \\
  -H 'Authorization: Bearer ${token}' \\
  -H 'Accept: application/json'`}
      </pre>
      <button
        onClick={() => refetch()}
        disabled={isFetching}
        style={{
          marginTop: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#e0e0e0',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {isFetching ? 'Testing...' : 'Test'}
      </button>
      <h2 style={{ marginTop: '1rem' }}>Response</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>
      ) : (
        <pre style={{ fontFamily: 'monospace', margin: 0 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default DeveloperTabView;