import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@radix-ui/themes/styles.css';

import { OAuthTriggerPage, UserList, OAuthRedirectPage, NotFoundPage, DeveloperTabPage } from '../pages';
import { OAuthProvider } from '../lib/OAuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Protected, Layout } from '../components';
import '../config/theme.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <OAuthProvider>
                    <Routes>
                        <Route path='/auth/trigger' element={<OAuthTriggerPage />} />
                        <Route path='/auth/redirect' element={<OAuthRedirectPage />} />
                        <Route path='/' element={<Layout />}>
                            <Route
                                path='/users'
                                element={
                                    <Protected>
                                        <UserList />
                                    </Protected>
                                }
                            />
                        </Route>
                        <Route path='/404' element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </OAuthProvider>
            </QueryClientProvider>
        </Router>
    );
}

export default App;
