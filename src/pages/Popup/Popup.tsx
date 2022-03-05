import React, { useEffect } from 'react';

import * as Sentry from '@sentry/react';
import styled from 'styled-components'
import {
  HashRouter, Route, Routes, useNavigate,
} from 'react-router-dom';
import Lockr from 'lockr'

import MainPage from './pages/Main';
import Dictionary from './pages/Dictionary';
import Settings from './pages/Settings';
import Container from './pages/Container';
import ErrorBoundary from './ErrorBoundary';
import Tutorial from './pages/Tutorial';

const Wrapper = styled.div`
  padding: 10px;
`

function AnimatedRouter() {
  const navigate = useNavigate()
  useEffect(() => {
    const uusi = Lockr.get('uusiUkko', true)
    if (uusi) {
      navigate('/tutoriaali')
    }
  }, []);

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/tutoriaali" element={<Tutorial />} />
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
