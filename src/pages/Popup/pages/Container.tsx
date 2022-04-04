import React, { useEffect, useState } from 'react';
import {
  Outlet, useLocation, useMatch, useNavigate,
} from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ActionIcon, Text, TextInput,
} from '@mantine/core';
import styled from 'styled-components';
import ArrowBack from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { observer } from 'mobx-react';
import extensionStore from '../Stores/ExtensionStore';

const Cont = styled.div`
  display: flex;
  flex-direction: row;
  //max-width: 300px;
  align-items: center;
  
  margin-bottom: 10px;
`

const variants = {
  open: {
    opacity: 1, width: 'auto', marginRight: 10,
  },
  closed: { opacity: 0, width: 0 },
}

const variants2 = {
  open: {
    opacity: 1, width: 'auto', marginLeft: 10,
  },
  closed: { opacity: 0, width: 0 },
}

const Container = () => {
  const [checked, setChecked] = useState(false)
  const match = useMatch('/')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!match) {
      setChecked(true)
    } else {
      extensionStore.setSearch('')
      setChecked(false)
    }
  }, [match]);

  return (
    <>
      <Cont>
        <motion.div
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, width: 0 }}
          animate={checked ? 'open' : 'closed'}
          style={{
            height: 'fit-content',
          }}
          variants={variants}
        >
          <ActionIcon size="lg">
            <ArrowBack />
          </ActionIcon>
        </motion.div>
        {location.pathname === '/asetukset' ? (
          <motion.div style={{ zIndex: 3 }} layoutId="kirjat">
            <Text style={{ zIndex: 3 }} p={0} weight={500}>Asetukset</Text>
          </motion.div>
        ) : (
          <TextInput
            autoComplete="off"
            autoFocus
            placeholder="Hae tästä"
            variant="filled"
            size="md"
            required
            value={extensionStore.search}
            onChange={(event) => {
              extensionStore.setSearch(event.target.value)
            }}
            id="containerTextfield"
            style={{ width: '100%' }}
          />
        )}
      </Cont>

      {/* <AnimatePresence exitBeforeEnter> */}
      <Outlet key={location.pathname} />
      {/* </AnimatePresence> */}
    </>
  );
};

export default observer(Container);
