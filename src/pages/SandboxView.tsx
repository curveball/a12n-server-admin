import ApiSandbox from '../components/ApiSandbox/ApiSandbox';

const SandboxView = () => {
    return (
        <div className='max-w-7xl mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Try the API</h1>
            <ApiSandbox />
        </div>
    );
};

export default SandboxView;
