// src/components/developer/DeveloperTabContainer.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DeveloperTabView from './DeveloperTabView';

export interface DeveloperTabContainerProps {
  /** Defaults to /user if that’s the endpoint showing your user listing */
  fetchUrl?: string;
  token?: string;
}

export function DeveloperTabContainer({
  fetchUrl = '/user',
  token = '',
}: DeveloperTabContainerProps) {
  // We'll assume your server is at http://localhost:8531
  // but if you have an env var, you can use import.meta.env.VITE_A12N_SERVER_URL
  const baseUrl = 'http://localhost:8531';
  const fullUrl = `${baseUrl}${fetchUrl}`;

  const fetchData = async () => {
    const res = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // If you need a token:
        // 'Authorization': `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch from ${fullUrl} - ${res.status} ${res.statusText}`);
    }
    return res.json(); // should contain `_links`, `total`, etc.
  };

  const queryResult = useQuery({
    queryKey: ['users', fullUrl],
    queryFn: fetchData,
  });

  return (
    <DeveloperTabView fetchUrl={fullUrl} token={token} queryResult={queryResult} />
  );
}