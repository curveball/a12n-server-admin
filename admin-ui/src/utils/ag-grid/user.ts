import StatusPill from '@/components/StatusPill';

const columnDefs = [
    { field: 'firstName', flex: 1, minWidth: 150, resizable: false },
    { field: 'lastName', flex: 1, minWidth: 150, resizable: false },
    { field: 'emailAddress', flex: 1, minWidth: 200, resizable: false },
    {
        field: 'isActive',
        flex: 1,
        minWidth: 150,
        resizable: false,
        cellRenderer: StatusPill,
    },
];

export default columnDefs;
