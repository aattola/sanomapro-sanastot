import React, { useEffect, useState } from 'react';
import Lockr from 'lockr'
import { Material } from '../types/Materials';

export function useFavorites() {
  const [fav, setFav] = useState<Material[]>([]);

  function addFavorite(e: React.MouseEvent, material: Material) {
    e.preventDefault();
    const tempFav = [...fav];

    if (!tempFav.includes(material)) {
      tempFav.push(material);
      setFav(tempFav);
      Lockr.set('favorites', tempFav);
      return;
    }

    const filtered = tempFav.filter((item) => item.materialId !== material.materialId);
    setFav(filtered);
    Lockr.set('favorites', filtered);
  }

  useEffect(() => {
    const localFavorites = Lockr.get('favorites') ? Lockr.get('favorites') : [];
    setFav(localFavorites);
  }, []);

  return { fav, addFavorite };
}
