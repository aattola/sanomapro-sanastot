import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Skeleton } from '@mantine/core';
import { useMaterial } from '../hooks/useMaterial';
import Material from '../components/Material';

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
  const { id } = useParams()
  const data = useMaterial((id as string))

  useEffect(() => {
    document.getElementById('containerTextfield')?.focus()
  }, []);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.2 }}
      key="dictionary"
    >
      {data ? (
        <Material dictionary={data} />
      ) : (
        <>
          <Skeleton height={15} radius="sm" />
          <Skeleton style={{ marginTop: 10 }} height={15} radius="xl" />
          <Skeleton style={{ marginTop: 10 }} height={15} radius="xl" />
          <Skeleton style={{ marginTop: 10 }} height={15} radius="xl" />
        </>
      )}

    </motion.div>
  );
}

export default Dictionary;
