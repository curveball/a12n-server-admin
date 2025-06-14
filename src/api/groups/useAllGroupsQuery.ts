import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAllGroups } from '.';
import { useAxios } from '../../hooks';
import { Group, HalLink, Resource } from '../../types';

const useAllGroupsQuery = () => {
    const api = useAxios();
    const queryOptions = getAllGroups(api);
    const [groups, setGroups] = useState<HalLink[]>([]);
    const [groupCount, setGroupCount] = useState(0);
    const { data, isLoading, error } = useQuery(queryOptions);

    useEffect(() => {
        if (data) {
            setGroups(data as unknown as HalLink[]);
            setGroupCount((data as Resource<Group>[]).length);
        }
    }, [data]);

    return { data, groups, groupCount, isLoading, error };
};

export default useAllGroupsQuery;
