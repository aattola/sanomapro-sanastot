import React from 'react';
import { observer } from 'mobx-react';

import { useDebouncedValue } from '@mantine/hooks';
import useSearch from '../hooks/useSearch';
import { Dictionary } from '../types/Dictionary';
import searchStore from '../Stores/SearchStore';
import { Result, Paragraph } from '../styles/Material';

interface Props {
  dictionary: Dictionary
}

const Material = ({ dictionary }: Props) => {
  const [debounced] = useDebouncedValue(searchStore.search, 300, { leading: true });

  const results = useSearch<{origin: string, translation: string, id: string}>(dictionary.translations, debounced, {
    keys: ['origin', 'translation'],
    useExtendedSearch: true,
    limit: 30,
  })

  const translations = results.map((result) => (
    <Result key={result.item.id}>
      <Paragraph onClick={() => navigator.clipboard.writeText(result.item.origin)}>{result.item.origin}</Paragraph>
      <Paragraph onClick={() => navigator.clipboard.writeText(result.item.translation)}>{result.item.translation}</Paragraph>
    </Result>
  ))

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 14 }}>
        {searchStore.search === '' && (
          <p>Hae sanoja tuosta ylhäältä</p>
        )}
        {!translations[0] && searchStore.search !== '' && (
          <p>Ei löytynyt mitään.</p>
        )}
      </div>
      {translations}
    </div>
  );
}

export default observer(Material);
