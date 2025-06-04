import { Badge } from '@radix-ui/themes';
import React from 'react';
import { ResponsePreview } from './ResponsePreview';

interface ResponseDetailsProps {
    /**
     * The time taken to fetch the response in seconds.
     */
    elapsed?: number;
    isLoading: boolean;
    error: Error | null;
    data: unknown;
}

export const ResponseDetails: React.FC<ResponseDetailsProps> = ({ elapsed, isLoading, error, data }) => (
    <>
        <div className='flex flex-row items-center gap-3 mb-2'>
            <h2 className='text-lg font-semibold mb-1' data-testid='response-details-heading'>
                Response
            </h2>

            {elapsed && (
                <Badge color='violet' size='2' radius='full' variant='solid'>
                    {elapsed?.toFixed(2) ?? '0.00'}s
                </Badge>
            )}
        </div>
        <p className='text-sm text-gray-500 mb-4'>The raw JSON response retrieved from the API request.</p>
        <ResponsePreview isLoading={isLoading} error={error as Error} data={data} />
    </>
);
