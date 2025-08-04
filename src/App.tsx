import '@radix-ui/themes/styles.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppList, GroupList, NotFoundPage, OAuthRedirectPage, OAuthTriggerPage, UserList } from './pages';
import './theme.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { Layout, Protected } from './components';
import { useOAuth } from './hooks';
import ApiSandbox from './pages/ApiSandbox';
import { OAuthProvider } from './providers/OAuthProvider/OAuthProvider';
import { CLIENT_ROUTES, SERVER_ROUTES } from './routes';

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

function App() {
    const { isAuthenticated } = useOAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            window.location.href = import.meta.env.VITE_AUTH_SERVER_URL + SERVER_ROUTES.LOGIN;
        }
    }, [isAuthenticated]);

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                {import.meta.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
                <OAuthProvider>
                    <Routes>
                        <Route path={CLIENT_ROUTES.AUTH_TRIGGER} element={<OAuthTriggerPage />} />
                        <Route path={CLIENT_ROUTES.AUTH_REDIRECT} element={<OAuthRedirectPage />} />
                        <Route path={CLIENT_ROUTES.ROOT} element={<Layout />}>
                            <Route
                                path={CLIENT_ROUTES.USERS_TABLE}
                                element={
                                    <Protected>
                                        <UserList />
                                    </Protected>
                                }
                            />
                            <Route
                                path={CLIENT_ROUTES.USERS_SANDBOX}
                                element={
                                    <Protected>
                                        <ApiSandbox />
                                    </Protected>
                                }
                            />
                            <Route
                                path={CLIENT_ROUTES.GROUPS_TABLE}
                                element={
                                    <Protected>
                                        <GroupList />
                                    </Protected>
                                }
                            />
                            <Route
                                path={CLIENT_ROUTES.APPS_TABLE}
                                element={
                                    <Protected>
                                        <AppList />
                                    </Protected>
                                }
                            />
                        </Route>
                        <Route path={CLIENT_ROUTES.NOT_FOUND} element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </OAuthProvider>
            </QueryClientProvider>
            <ToastContainer />
        </Router>
    );
}

export default App;
