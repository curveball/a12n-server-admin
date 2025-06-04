import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import TableList from '../components/TableList';
import { useAxios } from '../lib';
import { Groups } from '../utils/helpers/models';
import { getAllGroups } from '../utils/queries/groups';

const AppList = () => {
    const api = useAxios();
    const groupColumnHeadings = useMemo(
        () => [
            {
                field: 'nickname',
                headerName: 'Nickname',
                flex: 1,
                minWidth: 150,
                resizable: false,
            },
            {
                field: '_links.self.href',
                headerName: 'ID',
                flex: 1,
                minWidth: 150,
                resizable: false,
                valueGetter: (params: any) => Groups.parseGroupID(params.data),
            },
            {
                field: 'modifiedAt',
                headerName: 'Modified At',
                flex: 2,
                minWidth: 250,
                resizable: false,
                valueFormatter: (params: any) =>
                    new Date(params.value).toLocaleString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
            },
            {
                field: 'createdAt',
                headerName: 'Created At',
                flex: 1,
                minWidth: 250,
                resizable: false,
                valueFormatter: (params: any) =>
                    new Date(params.value).toLocaleString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
            },
        ],
        [],
    );
    const { data, isLoading, error } = useQuery(getAllGroups(api));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <TableList
            columnDefs={groupColumnHeadings}
            data={data}
            itemName='group'
            onDelete={() => console.log('Delete')}
        />
    );
};

export default AppList;
