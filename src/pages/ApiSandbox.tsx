import { QueryOptions } from '@tanstack/react-query';
import ApiSandbox from '../components/ApiSandbox/ApiSandbox';
import useSandboxQueries from '../hooks/useQueries';

const SandboxView = () => {
    const { queryOptions, queryParams } = useSandboxQueries();
    const fullUrl = import.meta.env.VITE_AUTH_SERVER_URL + queryParams;
    return (
        <div className='max-w-7xl mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Developer Tab Page</h1>
            <ApiSandbox queryOptions={queryOptions as QueryOptions} fullUrl={fullUrl} queryParams={queryParams} />
        </div>
    );
};

export default SandboxView;
