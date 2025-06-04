import { Badge } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import TableList from '../components/TableList';
import { useAxios } from '../lib';
import { Apps } from '../utils/helpers/models';
import { getAllApps } from '../utils/queries/apps';

const appColumnHeadings = [
    { field: 'nickname', headerName: 'App', flex: 1, minWidth: 150, resizable: false },
    {
        field: '_links.self.href',
        headerName: 'ID',
        flex: 1,
        minWidth: 150,
        resizable: false,
        valueGetter: (params: any) => Apps.parseAppID(params.data),
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
];

const AppList = () => {
    const api = useAxios();
    const { data, isLoading, error } = useQuery(getAllApps(api));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data);

    return (
        <TableList columnDefs={appColumnHeadings} data={data} itemName='app' onDelete={() => console.log('Delete')} />
    );
};

export default AppList;
