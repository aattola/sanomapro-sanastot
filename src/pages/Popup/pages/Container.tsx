import React, { useEffect, useState } from 'react';
import {
  Outlet, useLocation, useMatch, useNavigate,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ActionIcon, TextInput } from '@mantine/core';
import styled from 'styled-components';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { observer } from 'mobx-react';
import searchStore from '../Stores/SearchStore';

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

const Container = () => {
  const [checked, setChecked] = useState(false)
  const match = useMatch('/')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!match) {
      setChecked(true)
    } else {
      searchStore.setSearch('')
      setChecked(false)
    }
  }, [match]);

  return (
    <>
      <Cont>
        <motion.div
          onClick={() => navigate(-1)}
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
        <TextInput
          autoFocus
          placeholder="Hae tästä"
          variant="filled"
          size="md"
          required
          value={searchStore.search}
          onChange={(event) => {
            searchStore.setSearch(event.target.value)
          }}
          id="containerTextfield"
          style={{ width: '100%' }}
        />
      </Cont>

      <AnimatePresence exitBeforeEnter>
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </>
  );
};

export default observer(Container);
