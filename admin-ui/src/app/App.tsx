import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';         // Example home
import DeveloperTabPage from '@/pages/DeveloperTabPage'; // New page

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/developer" element={<DeveloperTabPage />} />
      </Routes>
    </BrowserRouter>
  );
}

