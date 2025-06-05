/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import TableList from '../../components/TableList/TableList';
import { useAxios } from '../../hooks';
import { Users } from '../../utils/helpers/models';
import { getAllUsers, getVerifiedUsers } from '../../utils/queries/users';

const UserList = () => {
    const api = useAxios();
    const userColumnHeadings = useMemo(
        () => [
            { field: 'nickname', headerName: 'User Name', flex: 1, minWidth: 150, resizable: false },
            {
                field: '_links.self.href',
                headerName: 'ID',
                flex: 1,
                minWidth: 150,
                resizable: false,
                valueGetter: (params: unknown) => Users.parseUserID(params.data),
            },
            {
                field: '_links.me',
                headerName: 'Email',
                flex: 1,
                minWidth: 200,
                resizable: false,
                valueGetter: (params: unknown) => Users.parseEmail(params.data),
            },
            {
                field: 'verified',
                headerName: 'Verified',
                flex: 1,
                minWidth: 150,
                resizable: false,
                cellRenderer: (params: any) => (
                    <Badge radius='full' color={params.value ? 'green' : 'red'}>
                        {params.value ? 'Verified' : 'Not Verified'}
                    </Badge>
                ),
            },
            {
                field: 'active',
                headerName: 'Status',
                flex: 1,
                minWidth: 150,
                resizable: false,
                cellRenderer: (params: any) => (
                    <Badge radius='full' color={params.value ? 'green' : 'gray'}>
                        {params.value ? 'Active' : 'Inactive'}
                    </Badge>
                ),
            },
            {
                field: 'hasPassword',
                headerName: 'Password',
                flex: 2,
                minWidth: 150,
                resizable: false,
                cellRenderer: (params: any) => (
                    <Badge radius='full' color={params.value ? 'green' : 'gray'}>
                        {params.value ? 'Set' : 'Not Set'}
                    </Badge>
                ),
            },
            {
                field: 'modifiedAt',
                headerName: 'Modified At',
                flex: 2,
                minWidth: 250,
                resizable: false,
                valueFormatter: (params: any) =>
                    new Date(params.value).toLocaleString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
            },
            {
                field: 'createdAt',
                headerName: 'Created At',
                flex: 1,
                minWidth: 250,
                resizable: false,
                valueFormatter: (params: any) =>
                    new Date(params.value).toLocaleString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
            },
        ],
        [],
    );
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
                columnDefs={userColumnHeadings}
                data={
                    data
                        ? data['_embedded']?.item?.map((user) => ({
                              ...user,
                              verified: (verifiedUsers ?? new Set()).has(user['_links']?.self?.href),
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
