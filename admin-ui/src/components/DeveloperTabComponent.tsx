// src/components/DeveloperTabComponent.tsx
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon, RocketIcon } from '@radix-ui/react-icons';

export interface DeveloperTabComponentProps {
  fetchUrl?: string;
  token?: string;
}

export function DeveloperTabComponent({
  fetchUrl = '/user?embed=item',
  token = 'DUMMY_TOKEN',
}: DeveloperTabComponentProps) {
  const baseUrl = 'http://localhost:8531';
  const fullUrl = `${baseUrl}${fetchUrl}`;

  // Data fetching (Container logic)
  const fetchData = async () => {
    const res = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch from ${fullUrl} (${res.status} ${res.statusText})`);
    }
    const json = await res.json();
    return json;
  };

  const queryResult = useQuery({
    queryKey: ['users', fullUrl],
    queryFn: fetchData,
  });

  const { data, error, isLoading, isFetching, refetch } = queryResult;

  // View-specific logic
  const [snippetType, setSnippetType] = useState<'curl' | 'node' | 'python'>('curl');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);

  useEffect(() => {
    if (isFetching && startTime === null) {
      setStartTime(Date.now());
      setElapsed(null);
    } else if (!isFetching && startTime !== null) {
      const endTime = Date.now();
      setElapsed((endTime - startTime) / 1000);
      setStartTime(null);
    }
  }, [isFetching, data, error, startTime]);

  // Build raw snippet based on selected type
  let rawSnippet = `curl '${fullUrl}' \\
  -H 'Authorization: Bearer ${token}' \\
  -H 'Content-Type: application/json'`;

  if (snippetType === 'node') {
    rawSnippet = `// Node fetch 
fetch('${fullUrl}', {
  headers: { 'Authorization': 'Bearer ${token}' }
}).then(res => res.json()).then(console.log);`;
  } else if (snippetType === 'python') {
    rawSnippet = `# Python requests
import requests

resp = requests.get('${fullUrl}',
  headers={'Authorization': 'Bearer ${token}'}
)
print(resp.json())`;
  }

  // Apply syntax highlighting styles to the snippet
  let snippetHtml = rawSnippet
    .replace(/-H/g, `<span style="color:#0062cc;">-H</span>`)
    .replace(
      /Authorization:/g,
      `<span style="color:#d9534f; font-weight:bold;">Authorization:</span>`
    )
    .replace(
      /Content-Type:/g,
      `<span style="color:#d9534f; font-weight:bold;">Content-Type:</span>`
    );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(console.error);
  };

  const codeBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(170,85,0,0.09)',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    padding: '1.25rem',
    paddingRight: '4rem',
    fontFamily: 'monospace',
    maxHeight: '300px',
    overflowY: 'auto',
    margin: 0,
    position: 'relative',
  };

  const preWrapStyle: React.CSSProperties = {
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    overflowWrap: 'anywhere',
    fontSize: '0.9rem',
    lineHeight: '1.4',
  };

  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem 0.75rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '0.9rem',
  };

  const menuItemStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '0.9rem',
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Request Section */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Request
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#555', margin: 0 }}>
          The REST API request that was sent to perform the required action.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '0.5rem',
        }}
      >
        <span
          style={{
            backgroundColor: '#d4edda',
            borderRadius: '4px',
            padding: '0.25rem 0.5rem',
            fontWeight: 600,
            fontSize: '0.875rem',
            color: '#155724',
          }}
        >
          GET
        </span>
        <span style={{ fontSize: '0.9rem', color: '#333', flex: 1 }}>
          {fullUrl}
        </span>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: '#AB6400',
                textTransform: 'none',
              }}
            >
              {snippetType}
              <ChevronDownIcon width={15} height={15} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              style={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '6px',
                padding: '0.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              <DropdownMenu.Item
                onClick={() => setSnippetType('curl')}
                style={menuItemStyle}
              >
                cURL
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => setSnippetType('node')}
                style={menuItemStyle}
              >
                Node
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => setSnippetType('python')}
                style={menuItemStyle}
              >
                Python
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          style={{
            ...buttonStyle,
            backgroundColor: '#008573',
          }}
        >
          <RocketIcon width={15} height={15} />
          {isFetching ? 'Testing...' : 'Test'}
        </button>
      </div>

      {/* Request Code Box */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <div style={codeBoxStyle}>
          <button
            onClick={() => copyToClipboard(rawSnippet)}
            style={{
              ...buttonStyle,
              backgroundColor: '#7D5E54',
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              fontSize: '0.75rem',
            }}
          >
            Copy
          </button>
          <pre style={{ ...preWrapStyle }} dangerouslySetInnerHTML={{ __html: snippetHtml }} />
        </div>
      </div>

      {/* Response Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1rem',
        }}
      >
        <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
          Response
        </h2>
        {elapsed !== null && (
          <span
            style={{
              backgroundColor: '#3A5BC7',
              borderRadius: '9999px',
              padding: '0.25rem 0.75rem',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            {elapsed.toFixed(1)}s
          </span>
        )}
      </div>
      <p style={{ fontSize: '0.875rem', color: '#555', margin: '0 0 0.5rem 0' }}>
        The raw JSON response retrieved from the API request.
      </p>
      <div style={{ position: 'relative' }}>
        <span
          style={{
            backgroundColor: '#6c757d',
            borderRadius: '4px',
            padding: '0.25rem 0.5rem',
            fontWeight: 600,
            fontSize: '0.875rem',
            color: '#fff',
            position: 'absolute',
            top: 0,
            right: 0,
            transform: 'translateY(-120%)',
          }}
        >
          Raw
        </span>
        <div style={codeBoxStyle}>
          {!isLoading && !error && data && (
            <button
              onClick={() => copyToClipboard(JSON.stringify(data, null, 2))}
              style={{
                ...buttonStyle,
                backgroundColor: '#6c757d',
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontSize: '0.75rem',
              }}
            >
              Copy
            </button>
          )}
          {isLoading ? (
            <p style={{ margin: 0 }}>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red', margin: 0 }}>{(error as Error).message}</p>
          ) : (
            <pre style={{ marginTop: '2.5rem', ...preWrapStyle }}>
              {data ? JSON.stringify(data, null, 2) : 'No data'}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeveloperTabComponent;