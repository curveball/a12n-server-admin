import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '@radix-ui/themes/styles.css';

import { OAuthTriggerPage, UserList, OAuthRedirectPage, NotFoundPage } from '../pages';
import { OAuthProvider } from '../lib/OAuthProvider';
import { Protected, Layout } from '../components';
import '../config/theme.css';

const queryClient = new QueryClient();

function App() {
    return (
        <Router>
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
        </Router>
    );
}

