import StatusPill from '../../components/StatusPill';

const columnDefs = [
    { field: 'firstName', flex: 1, minWidth: 150, resizable: false },
    { field: 'lastName', flex: 1, minWidth: 150, resizable: false },
    { field: 'emailAddress', flex: 1, minWidth: 200, resizable: false },
    {
        field: 'isActive',
        flex: 1,
        minWidth: 150,
        resizable: false,
        cellRenderer: (params: any) => {
            return (
                <StatusPill
                    variant={params.value ? 'active' : 'inactive'}
                    text={params.value ? 'Active' : 'Inactive'}
                />
            );
        },
    },
];

export default columnDefs;
