import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import { motion } from 'framer-motion'

import Materials from '../components/Materials';

const animations = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
}

function MainPage() {
  const [search, setSearch] = useState('')

  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <TextInput
        placeholder="Hae tästä"
        variant="filled"
        size="md"
        required
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        style={{ marginBottom: 10 }}
      />
      <Materials search={search} />
    </motion.div>
  );
}

export default MainPage;
