import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { motion } from 'framer-motion'
import { useQueryClient } from 'react-query';

const Container = styled.div`
  padding: 10px; 
  padding-top: 0px;
`;

function SettingsView() {
  const queryClient = useQueryClient()
  const [info, setInfo] = useState('');

  function flushCache() {
    localStorage.clear()
    queryClient.clear()
    setInfo('Cache poistettu')
  }

  function restart() {
    setInfo('Käynnistellään')
    chrome.runtime.reload()
  }

  function material() {
    localStorage.setItem('materialmode', String(true))
    chrome.runtime.reload()
  }

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.2 }}
      key="main"
    >
      <Container>
        <p style={{ marginTop: 1 }}>{info}</p>

        <p>
          id:
          {' '}
          {chrome?.runtime?.id}
        </p>

        <Button onClick={flushCache} variant="outlined">Poista cache</Button>
        <Button onClick={restart} variant="outlined" style={{ marginTop: 5 }}>Käynnistä uudelleen</Button>
        <Button onClick={material} variant="outlined" style={{ marginTop: 5 }}>Material💅🏾💅🏾💅🏾✨🤩 mode</Button>
      </Container>
    </motion.div>
  );
}

export default SettingsView;
