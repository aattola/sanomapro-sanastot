/* eslint-disable import/no-import-module-exports */
import React from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

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

render(<Popup />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
