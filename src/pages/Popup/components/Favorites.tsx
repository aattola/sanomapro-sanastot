import React, { useEffect, useState } from 'react';
import { Accordion } from '@mantine/core';
import { Link } from 'react-router-dom';
import { MaterialCard, MaterialGrid } from '../styles/Materials';
import { Material } from '../types/Materials';
import searchStore from '../Stores/ExtensionStore';

export function Favorites({
  materials, fav, addFavorite,
}: { materials: Material[], fav: Material[] | [], addFavorite: (e: React.MouseEvent, material: Material) => void }) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (fav[0]) return setValue('Lempparit');
    return setValue(null);
  }, [fav]);

  return (
    <Accordion
      value={value}
      onChange={setValue}
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
        value="Lempparit"
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
