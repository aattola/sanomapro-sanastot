import React, { useEffect, useState } from 'react';
import Lockr from 'lockr'
import { Material } from '../types/Materials';

export function useFavorites() {
  const [fav, setFav] = useState<Material[]>([]);

  function addFavorite(e: React.MouseEvent, material: Material) {
    e.preventDefault();
    const tempFav = [...fav];

    const includes = tempFav.filter((a) => a.materialId === material.materialId)
    if (includes[0]) {
      const filtered = tempFav.filter((item) => item.materialId !== material.materialId);
      Lockr.set('favorites', filtered);
      setFav(filtered);
      return;
    }

    tempFav.push(material);
    Lockr.set('favorites', tempFav);
    setFav(tempFav);
  }

  useEffect(() => {
    const localFavorites: Material[] | [] = Lockr.get('favorites') ? Lockr.get('favorites') : [];
    setFav(localFavorites);
  }, []);

  return { fav, addFavorite };
}
