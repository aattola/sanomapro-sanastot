/* eslint-disable import/no-import-module-exports */
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
// eslint-disable-next-line import/no-unresolved
import {} from 'styled-components/cssprop'
import { MantineProvider } from '@mantine/core';
import { observer } from 'mobx-react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { ReactQueryDevtools } from 'react-query/devtools'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Popup from './Popup';
import './index.css';
import extensionStore from './Stores/ExtensionStore';

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
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24 * 5, // 24 hours * 5 = 5 päivää
    },
  },
})

const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage })

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
})

function IndexMain() {
  return (
    <MantineProvider withGlobalStyles theme={{ colorScheme: extensionStore.theme }}>
      <Popup />
    </MantineProvider>
  )
}

const IndexMainObserved = observer(IndexMain)

const container = window.document.querySelector('#app-container')
const root = createRoot((container as Element))
root.render(
  <QueryClientProvider client={queryClient}>
    <IndexMainObserved />

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// if (module.hot) module.hot.accept();
