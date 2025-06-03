import { useQuery } from '@tanstack/react-query';
import TableList from '../components/TableList';
import { useAxios } from '../lib';
import { privilegesQuery } from '../utils/queries/privileges';

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
function PrivilegeList() {
    const api = useAxios();

    const { data, isLoading, error } = useQuery(privilegesQuery(api));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    const privilegeTableData = data ? data['_links'].item : [];

    const handleDelete = () => {
        console.log('delete privilege?');
    };
    return (
        <TableList
            columnDefs={privilegeColumnHeadings}
            data={privilegeTableData}
            itemName='privilege'
            onDelete={handleDelete}
        />
    );
}

export default PrivilegeList;
