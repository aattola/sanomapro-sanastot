import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

const Container = styled.div`
  padding: 10px; 
  padding-top: 0px;
`;

function SettingsView({ setView }) {
  const [info, setInfo] = useState('');

  function flushCache() {
    localStorage.clear()
    setInfo('Cache poistettu')
  }

  function restart() {
    setInfo('Käynnistellään')
    chrome.runtime.reload()
  }

  function material() {
    localStorage.setItem('materialmode', true)
    chrome.runtime.reload()
  }

  return (
    <Container>
      <p style={{ marginTop: 1 }}>{info}</p>

      <p>
        id:
        {' '}
        {chrome.runtime.id}
      </p>

      <Button onClick={flushCache} variant="outlined">Poista cache</Button>
      <Button onClick={restart} variant="outlined" style={{ marginTop: 5 }}>Käynnistä uudelleen</Button>
      <Button onClick={material} variant="outlined" style={{ marginTop: 5 }}>Material💅🏾💅🏾💅🏾✨🤩 mode</Button>
    </Container>
  );
}

export default SettingsView;
