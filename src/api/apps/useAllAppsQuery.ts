import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAllApps } from '.';
import { useAxios } from '../../hooks';
import { App, Resource } from '../../types';

const useAllAppsQuery = () => {
    const api = useAxios();
    const queryOptions = getAllApps(api);
    const [apps, setApps] = useState<Resource<App>[]>([]);

    const { data, isLoading, error } = useQuery(queryOptions);

    useEffect(() => {
        if (data) {
            setApps(data as unknown as Resource<App>[]);
        }
    }, [data]);

    return { data, apps, isLoading, error };
};

export default useAllAppsQuery;
