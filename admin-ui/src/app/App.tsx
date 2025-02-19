import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, SignupPage } from '@/pages';
import { Box, ThemePanel } from '@radix-ui/themes';
import AdminUsersPage from '@/pages/AdminUsersPage';
import AdminGroupsPage from '@/pages/AdminGroupsPage';
import AppsListPage from '@/pages/AppsListPage';
import AdminPrivilegesPage from '@/pages/AdminPrivilegesPage';
import APIRequestPage from '@/pages/AdminUsersApiPage';
import '@radix-ui/themes/styles.css';
import '@/config/fonts.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/auth/login' element={<LoginPage />} />
                <Route path='/config/theme' element={<ThemePanel />} />
                <Route path='/auth/signup' element={<SignupPage />} />
                <Route path="/users" element={<AdminUsersPage />} />
                <Route path="/groups" element={<AdminGroupsPage />} />
                <Route path="/apps" element={<AppsListPage />} />
                <Route path="/privileges" element={<AdminPrivilegesPage />} />
                <Route path="/users/api" element={<APIRequestPage />} />
            </Routes>
        </Router>
    );
};

export default App;
