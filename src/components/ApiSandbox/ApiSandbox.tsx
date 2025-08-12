import { Select, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { useEffect, useState } from 'react';
import useOAuth from '../../hooks/useOAuth';
import useSandboxQueries from '../../hooks/useSandboxQueries';
import { HttpRequestMethod } from '../../types/api';
import { CodeBlock } from '../CodeBlock';
import { RequestDetails } from './RequestDetails';
import { ResponseDetails } from './ResponseDetails';

export function ApiSandbox() {
    const { tokens } = useOAuth();
    const token = tokens ? tokens.accessToken : 'NO_TOKEN_FOUND';
    const { method, requestRoute, isFetching, data, error, refetch, setRequestRoute, fullUrl } = useSandboxQueries();
    const [startTime, setStartTime] = useState<number | undefined>(undefined);
    const [elapsed, setElapsed] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (isFetching && !startTime) {
            setStartTime(Date.now());
            setElapsed(undefined);
        } else if (!isFetching && startTime) {
            const endTime = Date.now();
            setElapsed((endTime - startTime) / 1000);
            setStartTime(undefined);
        }
    }, [isFetching, error, startTime, requestRoute]);

    const snippet = `${method} -X ${method.toLowerCase()} "${fullUrl}"`;

    return (
        <Theme>
            <Select.Root
                value={requestRoute}
                onValueChange={(value: string) => {
                    setRequestRoute(value);
                }}
            >
                <Select.Trigger className='w-full' data-testid='selection-trigger'>
                    <Select.Content className='w-full'>
                        <Select.Item value='/'>/</Select.Item>
                        <Select.Item value='/users'>/users</Select.Item>
                    </Select.Content>
                </Select.Trigger>
            </Select.Root>

            <div className='flex flex-col gap-2'>
                <RequestDetails
                    method={method as HttpRequestMethod}
                    isFetching={isFetching}
                    refetch={refetch}
                    fullUrl={fullUrl}
                    token={token}
                />

                <div className='response-section'>
                    <div className='snippet-container'>
                        <CodeBlock text={snippet} data-testid='request-snippet' />
                    </div>
                    <div className='response-details'>
                        <ResponseDetails
                            key={fullUrl}
                            data={data}
                            elapsed={elapsed}
                            isLoading={isFetching}
                            error={error as Error}
                        />
                    </div>
                </div>
            </div>
        </Theme>
    );
}

export default ApiSandbox;
