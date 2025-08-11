import ApiSandbox from '../components/ApiSandbox/ApiSandbox';
import useSandboxQueries from '../hooks/useSandboxQueries';

const SandboxView = () => {
    const { method, fullUrl, requestRoute, setRequestRoute, isFetching, data, error, refetch } = useSandboxQueries();

    return (
        <div className='max-w-7xl mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Developer Tab Page</h1>
            <ApiSandbox
                method={method}
                fullUrl={fullUrl}
                requestRoute={requestRoute ?? ''}
                setRequestRoute={setRequestRoute}
                isFetching={isFetching}
                data={data}
                error={error}
                refetch={refetch}
            />
        </div>
    );
};

export default SandboxView;
