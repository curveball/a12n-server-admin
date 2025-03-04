import React, { useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface DeveloperTabViewProps {
  fetchUrl: string;
  token: string;
  queryResult: UseQueryResult<any>;
}

const DeveloperTabView: React.FC<DeveloperTabViewProps> = ({
  fetchUrl,
  token,
  queryResult,
}) => {
  const { data, error, isLoading, isFetching, refetch } = queryResult;

  const [snippetType, setSnippetType] = useState<'curl' | 'node' | 'python'>('curl');

  // Build raw snippet
  let rawSnippet = `curl '${fetchUrl}' \\
  -H 'Authorization: Bearer ${token}' \\
  -H 'Content-Type: application/json'`;

  if (snippetType === 'node') {
    rawSnippet = `// Node fetch 
fetch('${fetchUrl}', {
  headers: { 'Authorization': 'Bearer ${token}' }
}).then(res => res.json()).then(console.log);`;
  } else if (snippetType === 'python') {
    rawSnippet = `# Python requests
import requests

resp = requests.get('${fetchUrl}',
  headers={'Authorization': 'Bearer ${token}'}
)
print(resp.json())`;
  }

  // Highlight: -H => blue, Authorization: => bold red, Content-Type: => bold red
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

  // Copy helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(console.error);
  };

  // Code box style
  const codeBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(170,85,0,0.09)',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    padding: '1.25rem',
    // Add extra right padding so the copy button doesn’t overlap the text
    paddingRight: '4rem',
    fontFamily: 'monospace',
    maxHeight: '300px',
    overflowY: 'auto',
    margin: 0,
    position: 'relative',
  };

  // <pre> style that forcibly wraps text (no horizontal scroll)
  const preWrapStyle: React.CSSProperties = {
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    overflowWrap: 'anywhere',
    fontSize: '0.9rem',
    lineHeight: '1.4',
  };

  // Button style (base)
  const buttonStyle: React.CSSProperties = {
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
      {/* Request Header */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Request
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#555', margin: 0 }}>
          The REST API request that was sent to perform the required action.
        </p>
      </div>

      {/* GET, cURL dropdown, Test button */}
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


        <span style={{ fontSize: '0.9rem', color: '#333', flex: 1 }}>{fetchUrl}</span>

        {/* Snippet dropdown (cURL, Node, Python) */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: '#AB6400',
                textTransform: 'none',
              }}
            >
              {snippetType} ▼
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

        {/* Test button */}
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          style={{
            ...buttonStyle,
            backgroundColor: '#008573',
          }}
        >
          {isFetching ? 'Testing...' : 'Test'}
        </button>
      </div>

      {/* Request code box with copy inside */}
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
          <pre style={{ ...preWrapStyle, marginTop: 0 }} dangerouslySetInnerHTML={{ __html: snippetHtml }} />
        </div>
      </div>

      {/* Response Header */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Response
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#555', margin: 0 }}>
          The raw JSON response retrieved from the API request.
        </p>
      </div>

      {/* Wrap the "Raw" pill + code box in a container so we can position "Raw" top-right */}
      <div style={{ position: 'relative' }}>
        {/* Raw pill (outside the code box, top-right) */}
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
            transform: 'translateY(-120%)', // scoot it above the box if you like
          }}
        >
          Raw
        </span>

        <div style={codeBoxStyle}>
          {/* Copy button on top-right inside the box (only if we have a response) */}
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
            <pre style={{ ...preWrapStyle, marginTop: 0 }}>
              {data ? JSON.stringify(data, null, 2) : 'Failed to fetch'}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperTabView;
