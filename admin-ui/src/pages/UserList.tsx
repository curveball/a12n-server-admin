import TableList from '../components/TableList';
import columnDefs from '../utils/ag-grid/user';
import { useQuery } from '@tanstack/react-query';
import { usersQuery } from '../utils/queries/users/users';
import { useOAuth } from '../lib/OAuthProvider';

const UserList = () => {
    const { tokens } = useOAuth();
    const { data, isLoading, error } = useQuery(tokens ? usersQuery(tokens) : { queryKey: [], queryFn: () => Promise.resolve([]) });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <TableList
            columnDefs={columnDefs}
            data={data['_embedded'].item}
            itemName='user'
            onDelete={() => console.log('Delete')}
        />
    );
};

export default UserList;
