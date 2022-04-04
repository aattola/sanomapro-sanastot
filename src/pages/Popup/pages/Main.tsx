import React from 'react';
import { ActionIcon } from '@mantine/core';
import { motion } from 'framer-motion';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

import Refresh from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useQueryClient } from 'react-query';
import Materials from '../components/Materials';
import extensionStore from '../Stores/ExtensionStore';
import { useFavorites } from '../hooks/useFavorites';
import { Favorites } from '../components/Favorites';

const Container = styled.div`
  display: flex;
  place-content: space-between;
  margin: 10px 0;
`

const Teksti = styled.div`
  font-size: 16px;
  margin: 0;
`

function MainPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { fav, addFavorite } = useFavorites()

  function refresh() {
    queryClient.resetQueries('materiaalit')
  }

  const inPopup = window.location.search.includes('popup')

  function popup() {
    chrome.windows.create({
      url: chrome.runtime.getURL('popup.html?popup=true'), type: 'popup', width: 335, height: 625,
    })
    window.close()
  }

  return (
    // <motion.div
    //   initial={{ x: 100, opacity: 0 }}
    //   animate={{ x: 0, opacity: 1 }}
    //   exit={{ x: -100, opacity: 0 }}
    //   transition={{ duration: 0.2 }}
    //   key="main"
    // >
    <>
      {fav[0] && (
        <Favorites
          fav={fav}
          addFavorite={addFavorite}
          materials={fav}
        />
      )}

      <Container>
        <motion.div onClick={() => navigate('/asetukset')} style={{ width: 'min-content', zIndex: 3 }} layoutId="kirjat">
          <Teksti style={{ zIndex: 3 }}>Kirjat:</Teksti>
        </motion.div>
        <div style={{ display: 'flex', gap: 2 }}>
          <ActionIcon onClick={extensionStore.toggleTheme} size="sm" radius="xl">
            {extensionStore.theme === 'light' ? (
              <LightModeTwoToneIcon fontSize="small" />
            ) : (
              <LightModeIcon fontSize="small" />
            )}
          </ActionIcon>
          {!inPopup && (
            <ActionIcon onClick={popup} size="sm" radius="xl">
              <OpenInNewIcon fontSize="small" />
            </ActionIcon>
          )}
          <ActionIcon onClick={() => navigate('/asetukset')} size="sm" radius="xl">
            <SettingsIcon fontSize="small" />
          </ActionIcon>
          <ActionIcon onClick={refresh} size="sm" radius="xl">
            <Refresh fontSize="small" />
          </ActionIcon>
        </div>
      </Container>

      <Materials search={extensionStore.search} addFavorite={addFavorite} />
    </>

  // </motion.div>
  );
}

export default observer(MainPage);
