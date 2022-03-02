import React, { useEffect } from 'react';
import { Accordion, useAccordionState } from '@mantine/core';
import { Link } from 'react-router-dom';
import { MaterialCard, MaterialGrid } from '../styles/Materials';
import { Material } from '../types/Materials';
import searchStore from '../Stores/SearchStore';

export function Favorites({
  materials, fav, addFavorite,
}: { materials: Material[], fav: Material[] | [], addFavorite: (e: React.MouseEvent, material: Material) => void }) {
  const [state, handlers] = useAccordionState({ total: 1, initialItem: 0 });

  useEffect(() => {
    if (fav[0]) return handlers.setState({ 0: true });
    return handlers.setState({ 0: false });
  }, [fav]);

  return (
    <Accordion
      state={state}
      onChange={handlers.setState}
      iconPosition="right"
      iconSize={14}
      sx={{
        button: {
          padding: 4, fontFamily: 'Poppins', fontSize: 14,
        },
      }}
    >
      <Accordion.Item
        sx={{
          borderBottom: '0px',
          '.mantine-Accordion-contentInner': {
            padding: 0,
          },
        }}
        label="Lempparit"
      >
        <MaterialGrid>
          {materials && materials[0] && materials.map((item) => (
            <Link key={item.materialId} to={`/sanasto/${item.materialId}`} onClick={() => searchStore.setSearch('')}>
              <MaterialCard onContextMenu={(e) => addFavorite(e, item)} image={item.coverImage} />
            </Link>
          ))}
        </MaterialGrid>
      </Accordion.Item>
    </Accordion>
  );
}
