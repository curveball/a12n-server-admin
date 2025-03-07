// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Theme, ThemePanel } from '@radix-ui/themes';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import App from './app/App';
import { OAuthProvider } from './lib/OAuthProvider';

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);