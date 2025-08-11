import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api';
import useOAuth from '../../hooks/useOAuth';
import { RequestDetails } from './RequestDetails';
import { ResponseDetails } from './ResponseDetails';

type ApiSandboxProps = {
    queryOptions: QueryOptions;
    fullUrl: string;
    queryParams: string;
};

export function ApiSandbox({ queryOptions, queryParams }: ApiSandboxProps) {
    const api = useAxios();
    const route = useLocation();
    switch (route.pathname) {
        case '/users/sandbox':
            queryOptions = getAllUsers(api) as QueryOptions;
            fullUrl = +'/user?embed=item';
            queryParams = '/user?embed=item';
            break;
    }
    const { tokens } = useOAuth();

    const { data, error, isLoading, isFetching, refetch } = useQuery({
        ...queryOptions,
        queryKey: queryOptions?.queryKey ?? ['defaultKey'],
    });

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
    }, [isFetching, data, error, startTime]);

    const token = tokens ? tokens.accessToken : 'NO_TOKEN_FOUND';

    return (
        <Theme>
            <div className='flex flex-col gap-2'>
                <RequestDetails
                    method='GET'
                    url={fullUrl}
                    isFetching={isFetching}
                    refetch={refetch}
                    data={data}
                    fullUrl={fullUrl}
                    token={token}
                />

                <ResponseDetails elapsed={elapsed} isLoading={isLoading} error={error as Error} data={data} />
            </div>
        </Theme>
    );
}

export default ApiSandbox;
