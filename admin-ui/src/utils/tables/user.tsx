import { Users } from '../helpers/models';
import { Badge } from '@radix-ui/themes';

const columnDefs = [
    { field: 'nickname', headerName: 'User Name', flex: 1, minWidth: 150, resizable: false },
    {
        field: '_links.self.href',
        headerName: 'ID',
        flex: 1,
        minWidth: 150,
        resizable: false,
        valueGetter: (params: any) => Users.parseUserID(params.data),
    },
    {
        field: '_links.me',
        headerName: 'Email',
        flex: 1,
        minWidth: 200,
        resizable: false,
        valueGetter: (params: any) => params.data._links.me[0].href.replace('mailto:', ''),
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
        flex: 1,
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

export default columnDefs;
