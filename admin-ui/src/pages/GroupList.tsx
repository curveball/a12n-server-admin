import TableList from '../components/TableList';
import columnDefs from '../utils/tables/group';
import { useQuery } from '@tanstack/react-query';
import { getAllGroups } from '../utils/queries/groups';
import { useAxios } from '../lib';

const AppList = () => {
    const api = useAxios();
    const { data, isLoading, error } = useQuery(getAllGroups(api));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <TableList
            columnDefs={columnDefs}
            data={data}
            itemName='group'
            onDelete={() => console.log('Delete')}
        />
    );
};

export default AppList;
