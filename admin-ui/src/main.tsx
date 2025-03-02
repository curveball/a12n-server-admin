import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/App';
import { Theme, ThemePanel } from '@radix-ui/themes';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Theme>
            <App />
            <ThemePanel defaultOpen={false} />
        </Theme>
    </StrictMode>,
);
