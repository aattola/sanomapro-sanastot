/* eslint-disable import/no-import-module-exports */
import React from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import {} from 'styled-components/cssprop'
import { MantineProvider } from '@mantine/core';

import { QueryClient, QueryClientProvider } from 'react-query';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Popup from './Popup';
import './index.css';

Sentry.init({
  dsn: 'https://e75aeeaccd9140b2bc60069e2d9a8aa3@o124657.ingest.sentry.io/6222133',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage })

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
})

render(
  (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={{ colorScheme: 'light' }}>
        <Popup />
      </MantineProvider>
    </QueryClientProvider>
  ), window.document.querySelector('#app-container'),
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (module.hot) module.hot.accept();
