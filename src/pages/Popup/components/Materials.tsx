import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MaterialCard, MaterialGrid } from '../styles/Materials';
import { useMaterials } from '../hooks/useMaterials';
import useSearch from '../hooks/useSearch';

interface Props {
  search: string
}

function Materials({ search }: Props) {
  const materials = useMaterials()

  const results = useSearch(materials, search, {
    keys: ['materialTitle'],
  })

  const books = results[0] ? results.map((book) => (
    <Kirja id={book.item.materialId} key={book.item.materialId}>
      <MaterialCard image={book.item.coverImage} />
    </Kirja>
  )) : materials.map((book) => (
    <Kirja id={book.materialId} key={book.materialId}>
      <MaterialCard image={book.coverImage} />
    </Kirja>
  ))

  return (
    <AnimatePresence>
      <MaterialGrid>
        {books}
      </MaterialGrid>
    </AnimatePresence>
  )
}

const Kirja: React.FC<{id: string}> = ({ id, children }) => (
  <Link to={`/sanasto/${id}`}>
    <motion.div initial={{ y: 10 }} animate={{ y: 0 }} layout>{children}</motion.div>
  </Link>
)

export default Materials;
