import React from 'react';
import { QueryFunction, useQuery } from 'react-query';
import { QueryFunctionContext } from 'react-query/types/core/types';

import { Dictionary } from '../types/Dictionary';

async function materialsQuery(ctx: QueryFunctionContext): Promise<Dictionary> {
  const res = await fetch(`https://sanastot.jeffe.workers.dev/sanastot/${ctx.queryKey[1]}`);
  const data = await res.json();
  return data
}

export function useMaterial(id: string): Dictionary | null {
  const { isError, isLoading, data } = useQuery<Dictionary>(['materiaali', id], materialsQuery);

  if (isError || !data) return null
  if (isLoading) return null

  return data
}
