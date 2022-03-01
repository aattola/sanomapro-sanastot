import React, { useState, useEffect } from 'react';

// import './Popup.css';
import * as Sentry from '@sentry/react';
import styled from 'styled-components'

import {
  HashRouter, Route, Routes, useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainPage from './pages';
import Dictionary from './pages/Dictionary';

const Container = styled.div`
  padding: 10px;
`

function AnimatedRouter() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes key={location.hash} location={location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/sanasto/:id" element={<Dictionary />} />
      </Routes>
    </AnimatePresence>
  )
}

function Popup() {
  return (
    <Container>
      <HashRouter>
        <AnimatedRouter />
      </HashRouter>
    </Container>
  );
}

export default Sentry.withProfiler(Popup);
