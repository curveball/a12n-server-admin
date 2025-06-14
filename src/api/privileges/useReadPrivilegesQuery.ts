import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAllPrivileges } from '.';
import { useAxios } from '../../hooks';
import { HalLink } from '../../types';
import { queryKeys } from '../query-keys';

const useReadPrivilegesQuery = () => {
    const api = useAxios();

    const { data, isLoading, error, refetch } = useQuery(getAllPrivileges(api));

    const [privileges, setPrivileges] = useState<HalLink[]>([]);

    useEffect(() => {
        if (data) {
            setPrivileges(data?._links?.item as HalLink[]);
        }
    }, [data]);

    const client = useQueryClient();
    client.invalidateQueries({ queryKey: queryKeys.privileges.all });

    return { isLoading, error, privileges, refetch };
};

export default useReadPrivilegesQuery;
