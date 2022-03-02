import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mantine/core';
import { MaterialCard, MaterialGrid } from '../styles/Materials';
import { useMaterials } from '../hooks/useMaterials';
import useSearch from '../hooks/useSearch';
import searchStore from '../Stores/SearchStore';
import { Material } from '../types/Materials';

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

  return (
    <AnimatePresence>
      <MaterialGrid>
        {books}
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
  <Link to={`/sanasto/${id}`} onClick={() => searchStore.setSearch('')}>
    <motion.div layout>{children}</motion.div>
  </Link>
)

export default Materials;
