import React from 'react';
import { QueryFunction, useQuery } from 'react-query';
import { QueryFunctionContext } from 'react-query/types/core/types';

import { v4 } from 'uuid';
import { Dictionary, Translation } from '../types/Dictionary';

async function materialsQuery(ctx: QueryFunctionContext): Promise<Dictionary> {
  const res = await fetch(`https://sanastot.jeffe.workers.dev/sanastot/${ctx.queryKey[1]}`);
  const data = await res.json();
  return data
}

export function useMaterial(id: string): Dictionary | null {
  const { isError, isLoading, data } = useQuery<Dictionary>(['materiaali', id], materialsQuery);

  if (isError || !data) return null
  if (isLoading) return null

  const translations: Translation = []

  if (data && (data as any)[0]) {
    const customData = data as any

    for (let i = 0; i < customData.length; i++) {
      const sana = customData[i]

      const uuid = v4()
      translations.push({ origin: sana.t, translation: `${sana.w} ${sana.i}`, id: uuid })
    }
  }

  data?.alphaEntries?.forEach((entry) => {
    if (!entry.targs) {
      // daata2.push({ head: da.head, translate: '' })
      return console.log('[WARNING] ei targ', entry)
    }

    if (!entry.targs[0]) {
      // daata2.push({ head: da.head, translate: '' })
      return console.log('[WARNING] ei targ indeksiä', entry)
    }
    const uuid = v4()
    translations.push({ origin: entry.head, translation: entry.targs[0].targ, id: uuid })
  })

  data.translations = translations

  return data
}
