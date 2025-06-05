import { useQuery } from '@tanstack/react-query';
import { HalLink } from 'hal-types';
import { useMemo } from 'react';
import { Table } from '../../components';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useAxios } from '../../hooks';
import { privilegesQuery } from '../../utils/queries/privileges';

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

    const { data, isLoading, error } = useQuery(privilegesQuery(api));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    const privilegeTableData = data ? (data['_links']?.item as HalLink[]) : [];

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
