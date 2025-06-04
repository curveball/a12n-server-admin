import { QueryOptions } from '@tanstack/react-query';
import DeveloperTabComponent from '../components/DeveloperTab/DeveloperTab';
import { useAxios } from '../lib';
import { getAllUsers } from '../utils/queries/users';

const ApiSandbox = () => {
    const api = useAxios();
    const queryOptions = getAllUsers(api) as QueryOptions;
    const fullUrl = 'http://localhost:8531/user?embed=item';
    return (
        <div className='max-w-7xl mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Developer Tab Page</h1>
            <DeveloperTabComponent queryOptions={queryOptions} fullUrl={fullUrl} />
        </div>
    );
};

export default ApiSandbox;
