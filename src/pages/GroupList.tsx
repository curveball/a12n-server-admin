/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useAllGroupsQuery } from '../api';
import { Table } from '../components';
import { Groups } from '../utils/helpers/models';

const GroupList = () => {
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

    const { data, groups, isLoading, error } = useAllGroupsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleAddGroup = () => {
        console.log('Add group');
    };

    const handleDeleteGroup = () => {
        console.log('Delete group');
    };
    return (
        <Table
            testId='group-list'
            columnDefs={groupColumnHeadings}
            data={data}
            itemName='group'
            onDelete={handleDeleteGroup}
            onAdd={handleAddGroup}
            initialValues={{}}
        />
    );
};

export default GroupList;
