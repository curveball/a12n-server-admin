import { useReadPrivilegesQuery } from '../../api/privileges';
import { Table } from '../../components';
import ErrorBoundary from '../../components/ErrorBoundary';

function PrivilegeList() {
    const privilegeColumnHeadings = [
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
    ];

    const { isLoading, error, privileges } = useReadPrivilegesQuery();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

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
                data={privileges ?? []}
                itemName='privilege'
                onDelete={handleDelete}
                initialValues={[]}
                onAdd={handleAddPrivilege}
            />
        </ErrorBoundary>
    );
}

export default PrivilegeList;
