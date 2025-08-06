import '@radix-ui/themes/styles.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppList, GroupList, NotFoundPage, OAuthTriggerPage, UserList } from './pages';
import Loading from './pages/Loading';
import './theme.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout, Protected } from './components';
import ApiSandbox from './pages/ApiSandbox';
import { OAuthProvider } from './providers/OAuthProvider/OAuthProvider';
import { CLIENT_ROUTES } from './routes';

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

// Route configuration array
const routesConfig = [
    {
        path: CLIENT_ROUTES.AUTH_TRIGGER,
        element: <OAuthTriggerPage />,
        isProtected: false,
        isNested: false,
    },
    {
        path: CLIENT_ROUTES.AUTH_REDIRECT,
        element: <Loading />,
        isProtected: false,
        isNested: false,
    },
    {
        path: CLIENT_ROUTES.USERS_TABLE,
        element: <UserList />,
        isProtected: true,
        isNested: true,
    },
    {
        path: CLIENT_ROUTES.USERS_SANDBOX,
        element: <ApiSandbox />,
        isProtected: true,
        isNested: true,
    },
    {
        path: CLIENT_ROUTES.GROUPS_TABLE,
        element: <GroupList />,
        isProtected: true,
        isNested: true,
    },
    {
        path: CLIENT_ROUTES.APPS_TABLE,
        element: <AppList />,
        isProtected: true,
        isNested: true,
    },
    {
        path: CLIENT_ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
        isProtected: false,
        isNested: false,
    },
    {
        path: '*',
        element: <NotFoundPage />,
        isProtected: false,
        isNested: false,
    },
];

function App() {
    // Separate nested routes from top-level routes
    const topLevelRoutes = routesConfig.filter((route) => !route.isNested);
    const nestedRoutes = routesConfig.filter((route) => route.isNested);

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                {['development', 'test'].includes(process.env.NODE_ENV || '') && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
                <OAuthProvider>
                    <Routes>
                        {/* Render top-level routes */}
                        {topLevelRoutes.map((route, index) => (
                            <Route key={`${route.path}-${index}`} path={route.path} element={route.element} />
                        ))}

                        {/* Root route with nested protected routes */}
                        <Route path={CLIENT_ROUTES.ROOT} element={<Protected>{<Layout />}</Protected>}>
                            {nestedRoutes.map((route, index) => (
                                <Route
                                    key={`nested-${route.path}-${index}`}
                                    path={route.path}
                                    element={route.isProtected ? <Protected>{route.element}</Protected> : route.element}
                                />
                            ))}
                        </Route>
                    </Routes>
                </OAuthProvider>
            </QueryClientProvider>
            <ToastContainer />
        </Router>
    );
}

export default App;
