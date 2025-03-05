import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/Layout';
import UserList from '@/pages/UserList';
import '@radix-ui/themes/styles.css';
import '@/config/theme.css';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    {/* The root route uses <Layout>, which contains the sidebar + <Outlet> */}
                    <Route path='/' element={<Layout />}>
                        {/* Child routes (render in <Outlet>) */}
                        <Route path='users' element={<UserList />} />

                        {/* Optionally, you could have an index route, e.g. <Route index element={<HomePage />} /> */}
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
