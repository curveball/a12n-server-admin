import TableList from '../components/TableList';
import columnDefs from '../utils/tables/user';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../lib';
import { getAllUsers, getVerifiedUsers } from '../utils/queries/users';

const UserList = () => {
    const api = useAxios();
    const { data, isLoading, error } = useQuery(getAllUsers(api));
    const {
        data: verifiedUsers,
        isLoading: verifiedUsersLoading,
        error: verifiedUsersError,
    } = useQuery(getVerifiedUsers(api));

    if (isLoading || verifiedUsersLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (verifiedUsersError) return <div>Error: {verifiedUsersError.message}</div>;

    return (
        <>
            <TableList
                columnDefs={columnDefs}
                data={
                    data
                        ? data['_embedded'].item.map((user) => ({
                              ...user,
                              verified: (verifiedUsers ?? new Set()).has(user['_links'].self.href),
                          }))
                        : []
                }
                itemName='user'
                onDelete={() => console.log('Delete')}
            />
        </>
    );
};

export default UserList;
