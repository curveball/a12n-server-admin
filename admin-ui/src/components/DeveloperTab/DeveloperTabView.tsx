
import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';

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


  const snippetHtml = `
curl '<span style="color:red;">${fetchUrl}</span>' \\
  -H 'Authorization: Bearer <span style="color:blue;">${token}</span>' \\
  -H 'Content-Type: application/json'
  `;

  // Copy text to clipboard. We can copy the plain text (without HTML) if desired.
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error('Failed to copy:', err);
    });
  };

  // For copying a plain-text snippet (no HTML tags)
  const plainSnippet = `curl '${fetchUrl}' \\
  -H 'Authorization: Bearer ${token}' \\
  -H 'Content-Type: application/json'`;

  // Shared style for code boxes
  const codeBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(170,85,0,0.09)',
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '1rem',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
    margin: 0,
  };

  // Shared style for pills
  const pillStyle: React.CSSProperties = {
    display: 'inline-block',
    borderRadius: '4px',
    padding: '0.25rem 0.5rem',
    fontWeight: 600,
    fontSize: '0.875rem',
    color: '#fff',
  };

  // Shared style for buttons
  const buttonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
  };

  return (
    <div style={{ backgroundColor: '#fff', fontFamily: 'sans-serif' }}>
      {/* Request Header */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Request
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#555', margin: 0 }}>
          The REST API request that was sent to perform the required action.
        </p>
      </div>

      {/* GET pill, Test & Copy buttons, cURL snippet */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
        {/* GET pill in light green */}
        <span style={{ ...pillStyle, backgroundColor: '#c8facc', color: '#333' }}>GET</span>

        {/* Endpoint text */}
        <span style={{ flex: 1, fontSize: '0.9rem', color: '#333' }}>{fetchUrl}</span>

        {/* Test Button (teal) */}
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

        {/* Copy Button (brown) */}
        <button
          onClick={() => copyToClipboard(plainSnippet)}
          style={{
            ...buttonStyle,
            backgroundColor: '#7D5E54',
          }}
        >
          Copy
        </button>
      </div>

      {/* cURL Snippet with color-coded parts (using dangerouslySetInnerHTML) */}
      <pre
        style={codeBoxStyle}
        dangerouslySetInnerHTML={{ __html: snippetHtml }}
      />

      {/* Response Header */}
      <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Response
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#555', margin: 0 }}>
          The raw JSON response retrieved from the API request.
        </p>
      </div>

      {/* Row with "Raw" pill + Copy button on top of the response box */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
        {/* Raw pill in neutral color */}
        <span style={{ ...pillStyle, backgroundColor: '#6c757d' }}>Raw</span>

        {/* Fill space */}
        <span style={{ flex: 1 }} />

        {/* Copy button for the response if loaded */}
        {!isLoading && !error && data && (
          <button
            onClick={() => copyToClipboard(JSON.stringify(data, null, 2))}
            style={{
              ...buttonStyle,
              backgroundColor: '#7D5E54',
            }}
          >
            Copy
          </button>
        )}
      </div>

      {/* Response box with maxHeight & overflowY */}
      <div
        style={{
          ...codeBoxStyle,
          maxHeight: '300px', // or any preferred max height
          overflowY: 'auto',  // vertical scroll if content is too long
        }}
      >
        {isLoading ? (
          <p style={{ margin: 0 }}>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red', margin: 0 }}>
            Error: {(error as Error).message}
          </p>
        ) : (
          <pre style={{ margin: 0 }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default DeveloperTabView;