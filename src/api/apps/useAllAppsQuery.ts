import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAllApps } from '.';
import { useAxios } from '../../hooks';
import { HalLink } from '../../types';

const useAllAppsQuery = () => {
    const api = useAxios();
    const queryOptions = getAllApps(api);
    const [apps, setApps] = useState<HalLink[]>([]);

    const { data, isLoading, error } = useQuery(queryOptions);

    useEffect(() => {
        if (data) {
            setApps(data?._links?.item as unknown as HalLink[]);
        }
    }, [data]);

    return { data, apps, isLoading, error };
};

export default useAllAppsQuery;
