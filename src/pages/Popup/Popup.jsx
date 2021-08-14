import React, { useState, useEffect } from 'react';

// import './Popup.css';

import MaterialSelector from './MaterialSelector.jsx'
import MaterialViewer from './MaterialViewer.jsx'

import styled from 'styled-components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import ErrorBoundary from './ErrorBoundary.jsx';
import { Button } from '@material-ui/core';
import Lockr from 'lockr'

const Container = styled.div`
  padding: 10px;
`

const BackButton = styled.div`
  cursor: pointer;
  font-size: 18px;
  width: fit-content;
`
const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;

  margin-bottom: 10px;
`

const Popup = () => {
  const [view, setView] = useState('selector')
  const [material, setMaterial] = useState({})
  const [materials, setMaterials] = useState([])
  const [tutorial, setTutorial] = useState(false)

  useEffect(() => {
    chrome.storage.sync.get('tutorial', function (data) {
      if (!data.tutorial) {
        setTutorial(true)
      }
    });

    const mat = Lockr.get("materials")

    if (mat) {
      console.log("[ASETIMME DATAA]", mat)
      setMaterials(mat)
    }

  }, [])

  return (
    <Container>
      {tutorial ? (
        <div style={{textAlign: "center"}}>
          <h1>Infoa tästä</h1>
          <p>Jos painat hiiren oikealla näppäimellä kirjaa niin se tallentuu lemppariksi ja jos oikealla klikkaat sitä uudelleen se menee pois lemppareista</p>
          <p>Bugeja voi olla ja niin edespäin ilmota näistä tai älä.</p>

          <Button variant="outlined" onClick={() => {
            chrome.storage.sync.set({ tutorial: true });
            setTutorial(false)
          }}>OK Jatketaan</Button>
        </div>
      ) : (
        <>
          {material.materialId && (
            <TopBar>
              <IconButton size="small" onClick={() => {
                setView("selector")
                setMaterial({})
              }} aria-label="delete">
                <ArrowBackIcon fontSize="inherit" />

              </IconButton>
              <p style={{margin: 0}}>{material.materialTitle}</p>
            </TopBar>
          )}

          {view === "selector" && (
            <ErrorBoundary>
              <MaterialSelector materials={materials} setMaterial={setMaterial} setView={setView} />
            </ErrorBoundary>
          )}

          {view === "viewer" && (
            <ErrorBoundary>
              <MaterialViewer material={material} setView={setView} />
            </ErrorBoundary>
          )}
        </>
      )}
    </Container>
  );
};

export default Popup;
