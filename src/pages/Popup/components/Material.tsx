import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import * as Comlink from 'comlink';

import Fuse from 'fuse.js';
import { Dictionary } from '../types/Dictionary';
import { Result, Paragraph } from '../styles/Material';
import extensionStore from '../Stores/ExtensionStore';

interface Props {
  dictionary: Dictionary
}

const wr = new Worker('worker.js');
const worker = Comlink.wrap<any>(wr);

const Material = ({ dictionary }: Props) => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState< Fuse.FuseResult<{origin: string, translation: string, id: string}>[]>([])

  async function search() {
    if (extensionStore.search === term) return
    if (extensionStore.search === '') {
      setResults([])
      return setTerm('')
    }

    await worker.search(dictionary.translations, extensionStore.search)
    const wResults = await worker.results

    if (wResults === results) return
    setResults(wResults)
    setTerm(extensionStore.search)
  }

  search()

  const translations = results.map((result) => (
    <Result key={result.item.id}>
      <Paragraph onClick={() => navigator.clipboard.writeText(result.item.origin)}>{result.item.origin}</Paragraph>
      <Paragraph onClick={() => navigator.clipboard.writeText(result.item.translation)}>{result.item.translation}</Paragraph>
    </Result>
  ))

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: 10, fontSize: 14 }}>
        {term === '' && (
          <p>Hae sanoja tuosta ylhäältä</p>
        )}
        {!translations[0] && extensionStore.search !== '' && (
          <p>Ei löytynyt mitään.</p>
        )}
      </div>
      {translations}
    </div>
  );
}

export default observer(Material);
