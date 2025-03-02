// src/app/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Root/Home route */}
      <Route path="/" element={<HomePage />} />

      {/* Only render the user page for /userspage */}
      <Route path="/userspage" element={<UserPage />} />
    </Routes>
  );
};

export default App;