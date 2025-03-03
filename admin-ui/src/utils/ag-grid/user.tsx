import { Badge } from '@radix-ui/themes';

const columnDefs = [
    { field: 'firstName', flex: 1, minWidth: 150, resizable: false },
    { field: 'lastName', flex: 1, minWidth: 150, resizable: false },
    { field: 'emailAddress', flex: 1, minWidth: 200, resizable: false },
    {
        field: 'isActive',
        flex: 1,
        minWidth: 150,
        resizable: false,
        cellRenderer: (params: any) => (
            <Badge radius='full' color={params.value ? 'green' : 'red'}>
                {params.value ? 'Active' : 'Inactive'}
            </Badge>
        ),
    },
];

export default columnDefs;
