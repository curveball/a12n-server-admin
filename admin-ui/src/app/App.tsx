import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, SignupPage } from '@/pages';
import { Box, ThemePanel } from '@radix-ui/themes';
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
            </Routes>
        </Router>
    );
};

export default App;
