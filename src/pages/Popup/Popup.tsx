import React from 'react';

import * as Sentry from '@sentry/react';
import styled from 'styled-components'
import {
  HashRouter, Route, Routes,
} from 'react-router-dom';

import MainPage from './pages/Main';
import Dictionary from './pages/Dictionary';
import Settings from './pages/Settings';
import Container from './pages/Container';
import ErrorBoundary from './ErrorBoundary';

const Wrapper = styled.div`
  padding: 10px;
`

function AnimatedRouter() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<MainPage />} />
          <Route path="asetukset" element={<Settings />} />
          <Route path="sanasto/:id" element={<Dictionary />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

function Popup() {
  return (
    <Wrapper>
      <HashRouter>
        <AnimatedRouter />
      </HashRouter>
    </Wrapper>
  );
}

export default Sentry.withProfiler(Popup);
