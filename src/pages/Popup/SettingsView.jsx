import React from 'react'
import styled from 'styled-components';
import { Button } from '@mui/material';

const Container = styled.div`
  padding: 10px;
`

function SettingsView({setView}) {
  return (
    <Container>
      <Button>Poista cache</Button>
    </Container>
  )
}

export default SettingsView
