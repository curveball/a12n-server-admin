import { Link } from 'react-router-dom';
import { useServerStats } from '../hooks';

export default function Home() {
    const { authenticatedUser } = useServerStats();

    return (
        <>
            <p>Hello, {authenticatedUser?.nickname}</p>
            <Link to='/sandbox'>API Sandbox</Link>
        </>
    );
}
