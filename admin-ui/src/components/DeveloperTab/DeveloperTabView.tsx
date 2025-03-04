import React, { useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
// Import the icons from Radix UI
import { ChevronDownIcon, RocketIcon } from '@radix-ui/react-icons';

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

  // snippet type: cURL / Node / Python
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
    paddingRight: '4rem', // extra space for the copy button
    fontFamily: 'monospace',
    maxHeight: '300px',
    overflowY: 'auto',
    margin: 0,
    position: 'relative',
  };

  // <pre> style that forcibly wraps text
  const preWrapStyle: React.CSSProperties = {
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    overflowWrap: 'anywhere',
    fontSize: '0.9rem',
    lineHeight: '1.4',
  };

  // Base button style
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
      {/* Request Header */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Request
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#555', margin: 0 }}>
          The REST API request that was sent to perform the required action.
        </p>
      </div>

      {/* GET, snippet dropdown, Test button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '0.5rem',
        }}
      >
        {/* GET pill */}
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

        {/* Test button (with RocketIcon) */}
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
          <pre style={{ ...preWrapStyle }} dangerouslySetInnerHTML={{ __html: snippetHtml }} />
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

      {/* "Raw" pill + code box in container */}
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
};

export default DeveloperTabView;