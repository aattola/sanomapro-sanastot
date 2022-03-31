import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Skeleton, Text } from '@mantine/core';
import { observer } from 'mobx-react';
import { MaterialCard, MaterialGrid } from '../styles/Materials';
import { useMaterials } from '../hooks/useMaterials';
import useSearch from '../hooks/useSearch';

import { Material } from '../types/Materials';
import extensionStore from '../Stores/ExtensionStore';

interface Props {
  search: string
  addFavorite: (event: React.MouseEvent, newFavorite: Material) => void;
}

function Materials({ search, addFavorite }: Props) {
  const materials = useMaterials()

  const results = useSearch(materials, search, {
    keys: ['materialTitle'],
  })

  const books = results[0] ? results.map((book) => (
    <Kirja id={book.item.materialId} key={book.item.materialId}>
      <MaterialCard onContextMenu={(e) => addFavorite(e, book.item)} image={book.item.coverImage} />
    </Kirja>
  )) : materials.map((book) => (
    <Kirja id={book.materialId} key={book.materialId}>
      <MaterialCard onContextMenu={(e) => addFavorite(e, book)} image={book.coverImage} />
    </Kirja>
  ))

  const listaBooks = results[0] ? results.map((book) => (
    <Kirja id={book.item.materialId} key={book.item.materialId}>
      <Text onContextMenu={(e: React.MouseEvent<Element, MouseEvent>) => addFavorite(e, book.item)} style={{ padding: '4px 0px' }} key={book.item.materialId}>{book.item.materialTitle}</Text>
    </Kirja>
  )) : materials.map((book) => (
    <Kirja id={book.materialId} key={book.materialId}>
      <Text onContextMenu={(e: React.MouseEvent<Element, MouseEvent>) => addFavorite(e, book)} style={{ padding: '4px 0px' }} key={book.materialId}>{book.materialTitle}</Text>
    </Kirja>
  ))

  return (
    <AnimatePresence>
      {extensionStore.listaMode && listaBooks}
      <MaterialGrid>
        {extensionStore.listaMode ? null : books}
        {!results[0] && !materials[0] && (
          <>
            <Skeleton height={120} mb="xl" />
            <Skeleton height={120} mb="xl" />
            <Skeleton height={120} mb="xl" />
          </>
        )}
      </MaterialGrid>
    </AnimatePresence>
  )
}

const Kirja: React.FC<{id: string}> = ({ id, children }) => (
  <Link style={{ textDecoration: 'none', color: extensionStore.theme !== 'dark' ? 'black' : 'white' }} to={`/sanasto/${id}`} onClick={() => extensionStore.setSearch('')}>
    <motion.div layout>{children}</motion.div>
  </Link>
)

export default observer(Materials);
