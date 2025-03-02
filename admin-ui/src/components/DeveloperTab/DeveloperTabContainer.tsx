// src/components/developer/DeveloperTabContainer.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DeveloperTabView from './DeveloperTabView';

export interface DeveloperTabContainerProps {
  fetchUrl?: string;
  token?: string;
}

export function DeveloperTabContainer({
  fetchUrl = '/user?embed=item',
  token = 'DUMMY_TOKEN',
}: DeveloperTabContainerProps) {
  console.log('DeveloperTabContainer: Rendering with token:', token);
  const baseUrl = 'http://localhost:8531';
  const fullUrl = `${baseUrl}${fetchUrl}`;
  console.log('DeveloperTabContainer: Full URL:', fullUrl);

  const fetchData = async () => {
    console.log('DeveloperTabContainer: fetchData called for:', fullUrl);
    const res = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });w
    if (!res.ok) {
      throw new Error(`Failed to fetch from ${fullUrl} (${res.status} ${res.statusText})`);
    }
    const json = await res.json();
    console.log('DeveloperTabContainer: Data fetched:', json);
    return json;
  };

  const queryResult = useQuery({
    queryKey: ['users', fullUrl],
    queryFn: fetchData,
  });

  console.log('DeveloperTabContainer: Query result:', queryResult);

  return (
    <div style={{ border: '2px dashed red', padding: '1rem', margin: '1rem 0' }}>
      <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        [DeveloperTabContainer is rendering]
      </p>
      <DeveloperTabView fetchUrl={fullUrl} token={token} queryResult={queryResult} />
    </div>
  );
}

export default DeveloperTabContainer;