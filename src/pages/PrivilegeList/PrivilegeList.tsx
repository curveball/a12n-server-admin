import { useQuery } from '@tanstack/react-query';
import { HalLink } from 'hal-types';
import { useMemo } from 'react';
import { getAllPrivileges } from '../../api/privileges';
import { Table } from '../../components';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useAxios } from '../../hooks';
import { Collection } from '../../types';

function PrivilegeList() {
    const privilegeColumnHeadings = useMemo(
        () => [
            {
                field: 'title',
                headerName: 'Privilege Title',
                flex: 1,
                minWidth: 300,
                resizable: false,
            },
            {
                field: 'href',
                headerName: 'URL',
                flex: 1,
                minWidth: 300,
                resizable: false,
            },
        ],
        [],
    );

    const api = useAxios();

    const { data, isLoading, error } = useQuery(getAllPrivileges(api));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    const privilegeTableData = data ? ((data as Collection<Record<string, unknown>>)['_links']?.item as HalLink[]) : [];

    const handleDelete = () => {
        console.log('delete privilege?');
    };

    const handleAddPrivilege = () => {
        console.log('add privilege');
    };

    return (
        <ErrorBoundary fallback={error} captureOwnerStack={() => ''}>
            <Table
                testId='privilege-list'
                columnDefs={privilegeColumnHeadings}
                data={privilegeTableData}
                itemName='privilege'
                onDelete={handleDelete}
                initialValues={[]}
                onAdd={handleAddPrivilege}
            />
        </ErrorBoundary>
    );
}

export default PrivilegeList;
