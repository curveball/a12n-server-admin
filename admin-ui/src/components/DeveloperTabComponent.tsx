import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon, RocketIcon } from '@radix-ui/react-icons';

// Radix Themes
import '@radix-ui/themes/styles.css';
import { Theme, Box, Button } from '@radix-ui/themes';

export interface DeveloperTabComponentProps {
  fetchUrl?: string; // e.g. "/user?embed=item"
  baseUrl?: string;  // from env or fallback
  token?: string;    // from env or fallback
}

export function DeveloperTabComponent({
  fetchUrl = '/user?embed=item',
  baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8531',
  token = import.meta.env.VITE_ACCESS_TOKEN || 'NO_TOKEN_FOUND',
}: DeveloperTabComponentProps) {
  const fullUrl = new URL(fetchUrl, baseUrl);

  // --------------------
  // Data Fetching (TanStack Query)
  // --------------------
  const fetchData = async () => {
    const res = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch from ${fullUrl} (${res.status} ${res.statusText})`);
    }
    return await res.json();
  };

  const queryResult = useQuery({
    queryKey: ['users', fullUrl],
    queryFn: fetchData,
  });

  const { data, error, isLoading, isFetching, refetch } = queryResult;

  // --------------------
  // View-Specific Logic
  // --------------------
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

  // Build raw snippet
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

  // Basic syntax highlighting
  const snippetHtml = rawSnippet
    .replace(/-H/g, `<span style="color:#0062cc;">-H</span>`)
    .replace(
      /Authorization:/g,
      `<span style="color:#d9534f; font-weight:bold;">Authorization:</span>`
    )
    .replace(
      /Content-Type:/g,
      `<span style="color:#d9534f; font-weight:bold;">Content-Type:</span>`
    );

  // Copy helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(console.error);
  };

  // Style objects (preserving original colors and spacing)
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

  return (
    <Theme>
      <Box style={{ fontFamily: 'sans-serif' }}>
        {/* Request Section */}
        <Box style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Request
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#555', margin: 0 }}>
            The REST API request that was sent to perform the required action.
          </p>
        </Box>

        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0.5rem',
          }}
        >
          <Box
            as="span"
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
          </Box>

          <Box as="span" style={{ fontSize: '0.9rem', color: '#333', flex: 1 }}>
            {fullUrl}
          </Box>

          {/* Snippet Type Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#AB6400',
                  color: '#fff',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                }}
              >
                {snippetType}
                <ChevronDownIcon width={15} height={15} />
              </Button>
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
                  style={{
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                  }}
                >
                  cURL
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => setSnippetType('node')}
                  style={{
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                  }}
                >
                  Node
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => setSnippetType('python')}
                  style={{
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                  }}
                >
                  Python
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <Button
            onClick={() => refetch()}
            disabled={isFetching}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#008573',
              color: '#fff',
              fontSize: '0.9rem',
            }}
          >
            <RocketIcon width={15} height={15} />
            {isFetching ? 'Testing...' : 'Test'}
          </Button>
        </Box>

        {/* Request Code Box */}
        <Box style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <Box style={codeBoxStyle}>
            <Button
              onClick={() => copyToClipboard(rawSnippet)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#7D5E54',
                color: '#fff',
                fontSize: '0.75rem',
                position: 'absolute',
                top: '1rem',
                right: '1rem',
              }}
            >
              Copy
            </Button>
            {/* Render the code snippet */}
            <Box
              as="div"
              style={preWrapStyle}
              dangerouslySetInnerHTML={{ __html: snippetHtml }}
            />
          </Box>
        </Box>

        {/* Response Section */}
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Response</h2>
          {elapsed !== null && (
            <Box
              as="span"
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
            </Box>
          )}
        </Box>
        <p style={{ fontSize: '0.875rem', color: '#555', margin: '0 0 0.5rem 0' }}>
          The raw JSON response retrieved from the API request.
        </p>

        <Box style={{ position: 'relative' }}>
          <Box
            as="span"
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
          </Box>

          <Box style={codeBoxStyle}>
            {!isLoading && !error && data && (
              <Button
                onClick={() => copyToClipboard(JSON.stringify(data, null, 2))}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  fontSize: '0.75rem',
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                }}
              >
                Copy
              </Button>
            )}

            {isLoading ? (
              <p style={{ margin: 0 }}>Loading...</p>
            ) : error ? (
              <p style={{ color: 'red', margin: 0 }}>{(error as Error).message}</p>
            ) : (
              // Use Box asChild to render a <pre> tag without TS error
              <Box asChild>
                <pre style={{ marginTop: '2.5rem', ...preWrapStyle }}>
                  {data ? JSON.stringify(data, null, 2) : 'No data'}
                </pre>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Theme>
  );
}

export default DeveloperTabComponent;