import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAllGroups } from '.';
import { useAxios } from '../../hooks';
import { HalLink } from '../../types';

const useAllGroupsQuery = () => {
    const api = useAxios();
    const queryOptions = getAllGroups(api);
    const [groups, setGroups] = useState<HalLink[]>([]);

    const { data, isLoading, error } = useQuery(queryOptions);

    useEffect(() => {
        if (data) {
            setGroups(data?._links?.item as unknown as HalLink[]);
        }
    }, [data]);

    return { data, groups, isLoading, error };
};

export default useAllGroupsQuery;
