import { RocketIcon } from '@radix-ui/react-icons';
import { Badge, Box, Button } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { CodeBlock } from '../CodeBlock';
import DropdownSelector from '../DropdownSelector';

export type SnippetType = 'curl' | 'node' | 'python';

interface RequestDetailsProps {
    method: string;
    url: string;
    data: unknown;
    isFetching: boolean;
    refetch: () => void;
    fullUrl: string;
    token: string;
}

export const RequestDetails: React.FC<RequestDetailsProps> = ({ method, url, isFetching, refetch, fullUrl, token }) => {
    const [snippetType, setSnippetType] = useState<SnippetType>('curl');
    const [snippetHtml, setSnippetHtml] = useState<string>('');

    useEffect(() => {
        let rawSnippet = '';
        switch (snippetType) {
            case 'node':
                rawSnippet = `fetch('${fullUrl}', {
    headers: { 'Authorization': 'Bearer ${token}' }
        }).then(res => res.json()).then(console.log);`;
                break;
            case 'python':
                rawSnippet = `import requests

response = requests.get('${fullUrl}', headers={'Authorization': 'Bearer ${token}'})
print(response.json())`;
                break;
            default:
                rawSnippet = `curl '${fullUrl}' \\
  -H 'Authorization: Bearer ${token}' \\
  -H 'Content-Type: application/json'`;
                break;
        }

        const html = rawSnippet
            .replace(/-H/g, `<span style="color:#0062cc;">-H</span>`)
            .replace(/Authorization:/g, `<span style="color:#d9534f; font-weight:bold;">Authorization:</span>`)
            .replace(/Content-Type:/g, `<span style="color:#d9534f; font-weight:bold;">Content-Type:</span>`);

        setSnippetHtml(html);
    }, [snippetType, fullUrl, token]);

    return (
        <>
            <Box className='mb-4'>
                <h2 className='text-lg font-semibold mb-1' data-testid='request-details-heading'>
                    Request
                </h2>
                <p className='text-sm text-gray-500'>
                    The REST API request that was sent to perform the required action.
                </p>
            </Box>

            <Box className='!flex items-center gap-4 mb-2'>
                <Badge color='green' size='3'>
                    {method}
                </Badge>
                <pre className='text-sm text-gray-700 flex-1'>{url}</pre>
            </Box>

            <div className='flex items-center gap-x-2 mb-2'>
                <DropdownSelector
                    selectedOption={snippetType}
                    onSelectionChange={setSnippetType}
                    options={['curl', 'node', 'python']}
                />

                <Button data-testid='test-fetch-button' onClick={() => refetch()} disabled={isFetching} color='green'>
                    <RocketIcon width={15} height={15} />
                    {isFetching ? 'Testing...' : 'Test'}
                </Button>
            </div>

            <Box className='mb-6'>
                <CodeBlock content={snippetHtml} isHtml isCopyEnabled />
            </Box>
        </>
    );
};
