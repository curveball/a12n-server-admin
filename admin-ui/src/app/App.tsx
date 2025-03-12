import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '@radix-ui/themes/styles.css';

import { OAuthTriggerPage, UserList, AppList OAuthRedirectPage, NotFoundPage, DeveloperTabPage, PrivilegeList } from '../pages';

import { OAuthProvider } from '../lib/OAuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Protected, Layout } from '../components';
import '../config/theme.css';
import { CLIENT_ROUTES } from '../utils/constants';

const queryClient = new QueryClient();

function App() {
    return (
        <Router>
            <QueryClientProvider client={queryClient}>
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
                                        <DeveloperTabPage />
                                    </Protected>
                                }
                            />
                            <Route
                                path={CLIENT_ROUTES.PRIVILEGES_TABLE}
                                element={
                                  <Protected>
                                    <PrivilegeList />
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

