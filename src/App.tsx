import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactLocation, Router } from '@tanstack/react-location';
import { SnackbarProvider, MaterialDesignContent } from 'notistack';
import styled from 'styled-components';

import { routes } from '@/routes';

import { AuthProvider, CategoryProvider } from '@/providers';

const location = new ReactLocation();

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    color: 'white',
  },
  '&.notistack-MuiContent-error': {
    color: 'white',
  },
}));

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <>
      <SnackbarProvider
        Components={{
          success: StyledMaterialDesignContent,
        }}
      >
        <AuthProvider>
          <CategoryProvider>
            <QueryClientProvider client={queryClient}>
              <Router location={location} routes={routes} />
            </QueryClientProvider>
          </CategoryProvider>
        </AuthProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
