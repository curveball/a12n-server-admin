import React from 'react';
import { useQuery } from '@tanstack/react-query';
import TableList from '../components/TableList';
import columnDefs from '../utils/tables/privilegeTable';
import { privilegesQuery } from '../utils/queries/privileges';
import { useAxios } from '../lib';

function PrivilegeList() {
    const api = useAxios();

    const { data, isLoading, error } = useQuery(privilegesQuery(api));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <TableList
            columnDefs={columnDefs}
            data={data ? data['_links'].item : []}
            itemName='privilege'
            onDelete={() => console.log('Delete privilege')}
        />
    );
}

export default PrivilegeList;
