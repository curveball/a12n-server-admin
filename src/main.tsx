import { Theme, ThemePanel } from '@radix-ui/themes';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Theme>
            <App />
            <ThemePanel defaultOpen={false} />
        </Theme>
    </StrictMode>,
);
