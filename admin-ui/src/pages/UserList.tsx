import TableList from '../components/TableList';
import columnDefs from '../utils/tables/user';
import { useQuery } from '@tanstack/react-query';
import { usersWithVerificationQuery } from '../utils/queries/users';
import { useOAuth } from '../lib/OAuthProvider';
import { useAxios } from '../utils/hooks/useAxios';

const UserList = () => {
    const { tokens } = useOAuth();
    const api = useAxios();
    const { data, isLoading, error } = useQuery(
        tokens ? usersWithVerificationQuery(api) : { queryKey: [], queryFn: () => Promise.resolve([]) },
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data);

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
