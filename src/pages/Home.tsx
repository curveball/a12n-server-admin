import { useServerStats } from '../hooks';

export default function Home() {
    const { authenticatedUser } = useServerStats();

    return (
        <>
            <p>Hello, {authenticatedUser?.nickname}</p>
        </>
    );
}
