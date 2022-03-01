import React from 'react';
import { useQuery } from 'react-query';
import { Material } from '../types/Materials';

function materialsQuery(): Promise<Material[]> {
  return fetch('https://sanastot.jeffe.workers.dev/sanastot').then((res) => res.json());
}

export function useMaterials(): Material[] | [] {
  const { isError, isLoading, data } = useQuery<Material[]>('materiaalit', materialsQuery);

  if (isError || !data) return [];
  if (isLoading) return []

  return data
}
