import React, { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr'
import Sifter from 'sifter'
import styled from 'styled-components'
import Lockr from 'lockr'

import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Fuse from 'fuse.js';
import { throttle } from 'lodash';

const Result = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  padding: 0px 5px;
  margin-bottom: 2px;

  border-radius: 4px;

  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);

  :hover {
    background-color: #fdfdfd;
    transform: translate3d(0px, -4px, 0px);
    box-shadow: 0px 2px 5px rgb(0 0 0 / 5%), 0 8px 10px rgb(0 0 0 / 5%);
  }
`

function MaterialViewer({ material, setView, setLoading }) {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [mat, setMat] = useState({})
  const { data: _data, error } = useSWR(`https://sanastot.jeffe.workers.dev/sanastot/${material.materialId}`, { revalidateOnFocus: false })

  useEffect(() => {
    const materiaali = Lockr.get(material.materialId)
    if (materiaali) {
      setMat(materiaali)
    }
  }, [material.materialId])
  const data = mat.bundleId ? mat : _data

  const daata2 = []
  if (data && data[0]) {
    console.log('Custom sanoja!')
    for (let i = 0; i < data.length; i++) {
      const sana = data[i]

      daata2.push({ head: sana.t, translate: `${sana.w} ${sana.i}` })
    }
  }

  data?.alphaEntries?.forEach((da) => {
    if (!da.targs) {
      // daata2.push({ head: da.head, translate: '' })
      return console.log('[WARNING] ei targ', da)
    }

    if (!da.targs[0]) {
      // daata2.push({ head: da.head, translate: '' })
      return console.log('[WARNING] ei targ indeksiä', da)
    }
    daata2.push({ head: da.head, translate: da.targs[0].targ })
  })

  const throttleTimer = daata2.length > 5000 ? 1250 : 500

  const fuse = new Fuse(daata2, {
    keys: ['head', 'translate'],
    useExtendedSearch: true,
    fieldNormWeight: 1.5,
  })

  const handleThrottle = throttle((e) => {
    const result = fuse.search(e.target.value, {
      limit: 14,
    })

    setResults(result)
  }, throttleTimer)

  function handleChange(e) {
    setSearch(e.target.value)
    if (e.target.value === '') {
      setResults([])
      return
    }
    handleThrottle(e)
  }

  if (error) return <div>failed to load</div>
  if (!data) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', alignContent: 'center', height: 200, justifyContent: 'center',
      }}
      >
        <CircularProgress />
      </div>
    )
  }

  Lockr.set(material.materialId, _data)

  return (
    <>
      <TextField value={search} onChange={handleChange} autoFocus label="Hae sanoja" fullWidth variant="outlined" size="small" />

      <div style={{ marginTop: 10 }}>
        {search !== '' && !results[0] && (
          <div style={{
            display: 'flex', alignItems: 'center', alignContent: 'center', minHeight: 150, justifyContent: 'center', textAlign: 'center',
          }}
          >
            <p style={{ fontSize: 14 }}>Mitään ei löytynyt</p>
          </div>
        )}

        {search === '' && !results[0] && (
          <div style={{
            display: 'flex', alignItems: 'center', alignContent: 'center', minHeight: 150, justifyContent: 'center', textAlign: 'center',
          }}
          >
            <p style={{ fontSize: 14 }}>Hae nyt jotain tosta ylempää.</p>
          </div>
        )}

        {results.map((res) => (
          <Result key={res.refIndex}>
            <p style={{ margin: 4, marginBottom: 0, cursor: 'pointer' }} onClick={() => navigator.clipboard.writeText(res.item.head)}>{res.item.head}</p>
            <p style={{ margin: 4, marginTop: 0, cursor: 'pointer' }} onClick={() => navigator.clipboard.writeText(res.item.translate)}>{res.item.translate}</p>
          </Result>
        ))}
      </div>
    </>
  );
}

export default MaterialViewer;
