import { Groups } from '../helpers/models';
import { Badge } from '@radix-ui/themes';

const columnDefs = [
    {
        field: 'title',
        headerName: 'Nickname',
        flex: 1,
        minWidth: 150,
        resizable: false,
    },
    {
        field: '_links.self.href',
        headerName: 'ID',
        flex: 1,
        minWidth: 150,
        resizable: false,
        valueGetter: (params: any) => Groups.parseGroupID(params.data),
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

export default columnDefs;
