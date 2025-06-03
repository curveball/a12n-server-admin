import TableList from '../components/TableList';
import columnDefs from '../utils/tables/app';
import { useQuery } from '@tanstack/react-query';
import { getAllApps } from '../utils/queries/apps';
import { useAxios } from '../lib';

const AppList = () => {
    const api = useAxios();
    const { data, isLoading, error } = useQuery(getAllApps(api));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data);

    return <TableList columnDefs={columnDefs} data={data} itemName='app' onDelete={() => console.log('Delete')} />;
};

export default AppList;
