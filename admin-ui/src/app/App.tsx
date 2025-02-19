import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage } from '@/pages';
import { Box, ThemePanel } from '@radix-ui/themes';
import AdminUsersPage from '@/pages/AdminUsersPage';
import '@radix-ui/themes/styles.css';
import '@/config/fonts.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/auth/login' element={<LoginPage />} />
                <Route path='/config/theme' element={<ThemePanel />} />
                <Route path="/users" element={<AdminUsersPage />} />
            </Routes>
        </Router>
    );
};

export default App;
