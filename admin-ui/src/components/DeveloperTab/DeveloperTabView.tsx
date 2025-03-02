
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

  // Copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error('Failed to copy:', err);
    });
  };

  // cURL snippet text
  const curlSnippet = `curl '${fetchUrl}' \\
  -H 'Authorization: Bearer ${token}' \\
  -H 'Content-Type: application/json'`;

  // Shared box style for request/response
  const boxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(170,85,0,0.09)', // #AA550009
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  };

  // Shared button style
  const buttonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
  };

  return (
    <div style={{ backgroundColor: '#fff' }}>
      {/* Request Title + Description */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Request
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#555', margin: 0 }}>
          The REST API request that was sent to perform the required action.
        </p>
      </div>

      {/* GET line + snippet + buttons */}
      <div style={{ marginBottom: '1.5rem' }}>
        {/* Row with GET + Endpoint + Test + Copy */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0.5rem',
          }}
        >
          {/* GET pill in green */}
          <span
            style={{
              backgroundColor: '#c8facc',
              borderRadius: '4px',
              padding: '0.25rem 0.5rem',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            GET
          </span>

          {/* Endpoint text */}
          <span style={{ fontSize: '0.9rem', color: '#333', flex: 1 }}>{fetchUrl}</span>

          {/* Test button (Teal) */}
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

          {/* Copy button (#7D5E54) */}
          <button
            onClick={() => copyToClipboard(curlSnippet)}
            style={{
              ...buttonStyle,
              backgroundColor: '#7D5E54',
            }}
          >
            Copy
          </button>
        </div>

        {/* cURL snippet box */}
        <div style={boxStyle}>{curlSnippet}</div>
      </div>

      {/* Response Title + Description */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Response
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#555', margin: 0 }}>
          The raw JSON response retrieved from the API request.
        </p>
      </div>

      {/* Response box (NO copy button here) */}
      <div style={boxStyle}>
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
