import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage } from '@/pages';
import { Box, ThemePanel } from '@radix-ui/themes';
import AdminUsersPage from '@/pages/AdminUsersPage';
import AdminGroupsPage from '@/pages/AdminGroupsPage';
import AdminTokensPage from '@/pages/AdminTokensPage';
import AdminPrivilegesPage from '@/pages/AdminPrivilegesPage';
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
          <Route path="groups" element={<AdminGroupsPage />} />
          <Route path="apps" element={<AppsListPage />} />
          <Route path="tokens" element={<AdminTokensPage />} />
          <Route path="privileges" element={<AdminPrivilegesPage />} />

          {/* Optionally, you could have an index route, e.g. <Route index element={<HomePage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;