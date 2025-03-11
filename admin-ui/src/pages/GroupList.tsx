import TableList from '../components/TableList';
import columnDefs from '../utils/tables/group';
import { useQuery } from '@tanstack/react-query';
import { getAllGroups } from '../utils/queries/groups';
import { useAxios } from '../lib';

const GroupList = () => {
    const api = useAxios();
    const { data, isLoading, error } = useQuery(getAllGroups(api));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log('data', data ? data['_links'].item : null);

    return (
        <TableList
            columnDefs={columnDefs}
            data={
                data && data['_links'] && data['_links'].item
                    ? Array.isArray(data['_links'].item)
                        ? data['_links'].item.map((group) => ({
                              ...group,
                              // You can add/modify fields here if needed
                          }))
                        : [data['_links'].item]
                    : []
            }
            itemName='group'
            onDelete={() => console.log('Delete')}
        />
    );
};

export default GroupList;
