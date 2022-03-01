import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { Button, Switch, TextInput } from '@mantine/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMaterial } from '../hooks/useMaterial';

const animations = {
  initial: { x: 100 },
  animate: { x: 0 },
  exit: { x: -100 },
}

const variants = {
  open: { opacity: 1, width: 'auto' },
  closed: { opacity: 0, width: 0 },
}

const Cont = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 300px;
`

const Dictionary = () => {
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState(false)
  const data = useMaterial('on_track_5')
  console.log(data)

  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1>tekstiä</h1>

      <Switch checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} />

      <Cont>
        <motion.div animate={checked ? 'open' : 'closed'} variants={variants}>
          <Button onClick={() => setChecked(false)}>O</Button>
        </motion.div>
        <TextInput
          placeholder="Hae tästä"
          variant="filled"
          size="md"
          required
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          style={{ marginBottom: 10, width: '100%' }}
        />
      </Cont>

      <Link to="/">
        <Button>Takaisin</Button>
      </Link>
    </motion.div>
  );
}

export default Dictionary;
