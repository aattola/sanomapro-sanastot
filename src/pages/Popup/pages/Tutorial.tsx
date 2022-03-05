import React, { useEffect } from 'react';
import Lockr from 'lockr'
import { motion } from 'framer-motion'
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.4,
    },
  },
  exit: {
    x: -40,
    opacity: 0,
  },
}

const item = {
  initial: { x: 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -20,
    opacity: 0,
  },
};

const Tutorial = () => {
  const navigate = useNavigate()
  useEffect(() => {
    Lockr.set('uusiUkko', false)
  }, []);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={item}>
        <img width={200} alt="Logo" src="./store440x280.png" />
      </motion.div>
      <motion.div variants={item}>
        <h1 style={{ fontFamily: 'Roboto Mono', marginTop: 0, marginBottom: 0 }}>Ohjeistusta käyttöön:</h1>
      </motion.div>
      <motion.div variants={item}>
        <p>Voit tallentaa kirjan klikkaamalla oikealla kirjan päältä</p>
      </motion.div>
      <motion.div variants={item}>
        <p>Virheitä voi olla ja niin edespäin ilmota näistä tai älä.</p>
      </motion.div>
      <motion.div variants={item}>
        <Button variant="outline" onClick={() => navigate('/')}>Jatketaan</Button>
      </motion.div>

    </motion.div>
  );
}

export default Tutorial;
