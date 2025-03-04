import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserPage from '@/pages/UserPage';
import HomePage from '@/pages/HomePage'; // or any other component

const App: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Layout/>} /> */}
      <Route path="/userspage" element={<UserPage />} />
      {/* <Route path="/users" element = {<UserList/>} /> */}
    </Routes>
  );
};

export default App;

