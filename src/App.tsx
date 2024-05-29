import React, { FC } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './clients/queryClient';
import { AppRoutes } from './components/routes/Routes';

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AppRoutes />
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  );
};
