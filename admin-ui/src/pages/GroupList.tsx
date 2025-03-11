import TableList from '../components/TableList';
import columnDefs from '../utils/tables/group';
import { useQuery } from '@tanstack/react-query';
// import { getAllGroups } from '../utils/queries/Groups';
import { useAxios } from '../lib';

const GroupList = () => {
    const api = useAxios();

    // TODO Implement getAllGroups
    const { data, isLoading, error } = useQuery(getAllGroups(api));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data);

    return (
        <TableList
            columnDefs={columnDefs}
            data={data}
            itemName='group'
            onDelete={() => console.log('Delete')}
        />
    );
};

export default GroupList;