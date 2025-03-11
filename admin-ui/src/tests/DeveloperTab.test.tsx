import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import DeveloperTabComponent from '../components/DeveloperTabComponent';
import DeveloperTabPage from '../pages/DeveloperTabPage';


vi.mock('../lib/OAuthProvider', () => ({
  useOAuth: () => ({ tokens: { accessToken: 'test-token' } }),
}));


vi.mock('../utils/hooks', () => ({
  useAxios: () => ({}),
}));


vi.mock('../utils/queries/users', () => ({
  getAllUsers: (api: any) => ({
    queryKey: ['users'],
    queryFn: async () => Promise.resolve([]),
  }),
}));


if (!navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: async (text: string) => Promise.resolve(),
      readText: async () => Promise.resolve(''),
    },
    writable: true,
  });
} else {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      ...navigator.clipboard,
      writeText: async (text: string) => Promise.resolve(),
    },
    writable: true,
  });
}

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

describe('Developer Tab Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders DeveloperTabComponent with default snippet (curl) and shows empty data response', async () => {
    const queryClient = createQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <DeveloperTabComponent />
      </QueryClientProvider>
    );

   
    expect(screen.getByRole('heading', { name: /Request/i })).toBeInTheDocument();
    expect(screen.getByText('http://localhost:8531/user?embed=item')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /curl/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("[]")).toBeInTheDocument();
    });
  });

  it('copies snippet text to clipboard when the Copy button is clicked', async () => {
    const writeTextMock = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
    });

    const queryClient = createQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <DeveloperTabComponent />
      </QueryClientProvider>
    );

    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled();
    });
  });

  it('renders DeveloperTabPage with its header and embedded DeveloperTabComponent', () => {
    const queryClient = createQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <DeveloperTabPage />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Developer Tab Page/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Request/i })).toBeInTheDocument();
  });

  it('renders a Response section with a heading', () => {
    const queryClient = createQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <DeveloperTabComponent />
      </QueryClientProvider>
    );
    expect(screen.getByRole('heading', { name: /Response/i })).toBeInTheDocument();
  });

  it('snippet container contains "Bearer test-token"', async () => {
    const queryClient = createQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <DeveloperTabComponent />
      </QueryClientProvider>
    );
    await waitFor(() => {
      const bearerInstances = screen.queryAllByText(/Bearer test-token/i);
      expect(bearerInstances.length).toBeGreaterThan(0);
    });
  });
});