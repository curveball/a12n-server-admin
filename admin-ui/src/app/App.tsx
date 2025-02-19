import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage } from '@/pages';
import { Box, ThemePanel } from '@radix-ui/themes';
import AdminUsersPage from '@/pages/AdminUsersPage';
import AppsListPage from '@/pages/AppsListPage';
import Layout from '@/Layout';
import APIRequestPage from '@/pages/AdminUsersApiPage';
import '@radix-ui/themes/styles.css';
import '@/config/fonts.css';


function App() {
  return (
    <Router>
      <Routes>
        {/* The root route uses <Layout>, which contains the sidebar + <Outlet> */}
        <Route path="/" element={<Layout />}>
          {/* Child routes (render in <Outlet>) */}
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="groups" element={<h2>Groups Page (mock)</h2>} />
          <Route path="apps" element={<AppsListPage />} />
          <Route path="tokens" element={<h2>Tokens Page (mock)</h2>} />
          <Route path="privileges" element={<h2>Privileges Page (mock)</h2>} />

          {/* Optionally, you could have an index route, e.g. <Route index element={<HomePage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;