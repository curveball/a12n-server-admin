import '@radix-ui/themes/styles.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppList, GroupList, NotFoundPage, OAuthTriggerPage, UserList } from './pages';
import Loading from './pages/Loading';
import './theme.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout, Protected } from './components';
import { default as SandboxView } from './pages/ApiSandbox';
import Home from './pages/Home';
import { OAuthProvider } from './providers/OAuthProvider/OAuthProvider';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retryDelay: (failureCount, error) => {
                console.log(failureCount, error);
                return 1000;
            },
        },
    },
});

// Route configuration array;

const routesConfig = [
    {
        path: '/',
        element: <Layout />,
        isProtected: true,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/users',
                element: <UserList />,
                isProtected: true,
                children: [
                    {
                        path: '/users/sandbox',
                        element: <SandboxView />,
                    },
                ],
            },
            {
                path: '/groups',
                element: <GroupList />,
                isProtected: true,
            },
            {
                path: '/apps',
                element: <AppList />,
                isProtected: true,
            },
        ],
    },
    {
        path: '/auth/trigger',
        element: <OAuthTriggerPage />,
    },
    {
        path: '/auth/redirect',
        element: <Loading />,
    },

    {
        path: '/404',
        element: <NotFoundPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];

function App() {
    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                {['development', 'test'].includes(process.env.NODE_ENV || '') && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
                <OAuthProvider>
                    <Routes>
                        {routesConfig.map((route, index) => (
                            <Route
                                key={`${route.path}-${index}`}
                                path={route.path}
                                element={route.isProtected ? <Protected>{route.element}</Protected> : route.element}
                            >
                                {route.children &&
                                    route.children.map((child, index) => (
                                        <Route
                                            key={`${child.path}-${index}`}
                                            path={child.path}
                                            element={child.element}
                                        />
                                    ))}
                            </Route>
                        ))}
                    </Routes>
                </OAuthProvider>
            </QueryClientProvider>
            <ToastContainer />
        </Router>
    );
}

export default App;
