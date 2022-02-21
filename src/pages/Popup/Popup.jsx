import React, { useState, useEffect } from 'react';

// import './Popup.css';

import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import Lockr from 'lockr'
import ErrorBoundary from './ErrorBoundary';
import MaterialViewer from './MaterialViewer'
import MaterialSelector from './MaterialSelector'
import SettingsView from './SettingsView';

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

function Popup() {
  const [view, setView] = useState('selector')
  const [material, setMaterial] = useState({})
  const [materials, setMaterials] = useState([])
  const [tutorial, setTutorial] = useState(false)
  const [materialMode, setMaterialMode] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get('tutorial', (data) => {
      if (!data.tutorial) {
        setTutorial(true)
      }
    });

    const mat = Lockr.get('materials')
    const materialmodeToggle = localStorage.getItem('materialmode')
    console.log(materialmodeToggle)

    if (materialmodeToggle) {
      setMaterialMode(true)
    }

    if (mat) {
      console.log('[ASETIMME DATAA]', mat)
      setMaterials(mat)
    }
  }, [])

  const inPopup = window.location.search.includes('popup')

  function openInPopup() {
    chrome.windows.create({ url: chrome.runtime.getURL('popup.html?popup=true'), type: 'popup', width: 320 })
    window.close()
  }

  return (
    <Container>
      {materialMode && (
        <video
          style={{
            width: '100vh', position: 'absolute', left: 0, top: 0, zIndex: -1,
          }}
          autoPlay
          loop
          muted
        >
          <source src={chrome.runtime.getURL('damn.mp4')} type="video/mp4" />
        </video>
      )}
      {tutorial ? (
        <div style={{ textAlign: 'center' }}>
          <h1>Infoa tästä</h1>
          <p>Jos painat hiiren oikealla näppäimellä kirjaa niin se tallentuu lemppariksi ja jos oikealla klikkaat sitä uudelleen se menee pois lemppareista</p>
          <p>Bugeja voi olla ja niin edespäin ilmota näistä tai älä.</p>

          <Button
            variant="outlined"
            onClick={() => {
              chrome.storage.sync.set({ tutorial: true });
              setTutorial(false)
            }}
          >
            OK Jatketaan
          </Button>
        </div>
      ) : (
        <>
          {material.materialId && (
            <TopBar>
              <IconButton
                size="small"
                onClick={() => {
                  setView('selector')
                  setMaterial({})
                }}
                aria-label="delete"
              >
                <ArrowBackIcon fontSize="inherit" />

              </IconButton>
              <p style={{ margin: 0 }}>{material.materialTitle}</p>
            </TopBar>
          )}

          {view === 'selector' && (
            <ErrorBoundary>
              <MaterialSelector materials={materials} setMaterial={setMaterial} setView={setView} />
              {!inPopup && (
                <center>
                  <Button variant="outlined" onClick={openInPopup}>Avaa uudessa ikkunassa</Button>
                </center>
              )}
            </ErrorBoundary>
          )}

          {view === 'viewer' && (
            <ErrorBoundary>
              <MaterialViewer material={material} setView={setView} />
            </ErrorBoundary>
          )}

          {view === 'settings' && (
            <ErrorBoundary>
              <TopBar>
                <IconButton
                  size="small"
                  onClick={() => {
                    setView('selector')
                    setMaterial({})
                  }}
                  aria-label="delete"
                >
                  <ArrowBackIcon fontSize="inherit" />

                </IconButton>
                <p style={{ margin: 0 }}>Asetukset</p>
              </TopBar>
              <SettingsView setView={setView} />
            </ErrorBoundary>
          )}
        </>
      )}
    </Container>
  );
}

export default Popup;
