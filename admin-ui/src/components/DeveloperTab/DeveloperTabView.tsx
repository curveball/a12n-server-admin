// src/components/developer/DeveloperTabView.tsx
import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';

interface DeveloperTabViewProps {
  fetchUrl: string;
  token: string;
  queryResult: UseQueryResult<any>;
}

export default function DeveloperTabView({
  fetchUrl,
  token,
  queryResult,
}: DeveloperTabViewProps) {
  const { data, error, isLoading, isFetching, refetch } = queryResult;

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Request</h2>
      <div style={{ backgroundColor: '#f8f8f8', padding: '1rem', borderRadius: '6px' }}>
        <pre style={{ margin: 0 }}>
{`GET ${fetchUrl}
curl '${fetchUrl}' \\
  -H 'Authorization: Bearer ${token}' \\
  -H 'Accept: application/json'
`}
        </pre>
        <button onClick={() => refetch()} disabled={isFetching} style={{ marginTop: '0.5rem' }}>
          {isFetching ? 'Testing...' : 'Test'}
        </button>
      </div>

      <h2 style={{ fontWeight: 600, margin: '1rem 0 0.5rem' }}>Response</h2>
      <div style={{ backgroundColor: '#f8f8f8', padding: '1rem', borderRadius: '6px' }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>
        ) : (
          <pre style={{ margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}