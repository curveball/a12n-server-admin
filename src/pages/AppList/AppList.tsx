import { Badge } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Table } from '../../components';
import UpdateAppModal from '../../components/Modal/UpdateAppModal';
import { useAxios } from '../../lib';
import { Apps } from '../../utils/helpers/models';
import { getAllApps } from '../../utils/queries/apps';

const AppList = () => {
    const api = useAxios();
    const { data, isLoading, error } = useQuery(getAllApps(api));
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const appColumnHeadings = useMemo(
        () => [
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
        ],
        [],
    );

    if (isLoading || !data) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    const handleAddApp = () => {
        console.log('Add app');
    };

    const handleDeleteApp = () => {
        console.log('Delete app');
    };

    const handleDoubleClick = (rowData: unknown) => {
        console.log(rowData);
        setIsUpdateModalOpen(true);
    };
    return (
        <>
            <Table
                testId='app-list'
                columnDefs={appColumnHeadings}
                data={data}
                itemName='app'
                initialValues={{}}
                onDelete={handleDeleteApp}
                onAdd={handleAddApp}
                onDoubleClick={handleDoubleClick}
            />

            <UpdateAppModal onClose={() => setIsUpdateModalOpen(false)} isOpen={isUpdateModalOpen} />
        </>
    );
};

export default AppList;
