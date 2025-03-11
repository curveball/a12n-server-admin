import DeveloperTabComponent from '../components/DeveloperTabComponent';
import { getAllUsers } from '../utils/queries/users';
import { useAxios } from '../lib';
import { QueryOptions } from '@tanstack/react-query';

function DeveloperTabPage() {
    const api = useAxios();
    const queryOptions = getAllUsers(api) as QueryOptions;
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ marginBottom: '1rem' }}>Developer Tab Page</h1>
            <DeveloperTabComponent queryOptions={queryOptions} fullUrl='http://localhost:8531/user?embed=item' />
        </div>
    );
}

export default DeveloperTabPage;
