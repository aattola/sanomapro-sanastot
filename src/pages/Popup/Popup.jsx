import React, { useState } from 'react';

// import './Popup.css';

import MaterialSelector from './MaterialSelector.jsx'
import MaterialViewer from './MaterialViewer.jsx'

import styled from 'styled-components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

const Container = styled.div`
  margin: 10px;
`

const BackButton = styled.div`
  cursor: pointer;
  font-size: 18px;
  width: fit-content;
`


const Popup = () => {
  const [view, setView] = useState('selector')
  const [material, setMaterial] = useState({})

  return (
    <Container>
      {material.materialId && (


        <IconButton  onClick={() => {
          setView("selector")
          setMaterial({})
        }} aria-label="delete">
          <ArrowBackIcon />
        </IconButton>
      )}

      {view === "selector" && (
        <MaterialSelector setMaterial={setMaterial} setView={setView} />
      )}

          {view === "viewer" && (
        <MaterialViewer material={material} setView={setView} />
      )}
    </Container>
  );
};

export default Popup;
