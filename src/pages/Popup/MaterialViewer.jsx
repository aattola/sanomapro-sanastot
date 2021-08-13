import React, { useState } from 'react';
import useSWR from 'swr'
import Sifter from 'sifter'
import styled from 'styled-components'

import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

const Result = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
`

const MaterialViewer = ({ material, setView, setLoading }) => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const { data, error } = useSWR(`https://sanastot.sanomapro.fi/api/v1/material/${material.materialId}`)

  if (error) return <div>failed to load</div>
  if (!data) {
    return (
      <div style={{display: 'flex', alignItems: "center", alignContent: "center", height: 200, justifyContent: 'center'}}>
        <CircularProgress />
      </div>
    )
  }

  console.log("NETISTÄ DATAA", data)

  let daata2 = []
  data.alphaEntries.forEach(da => {
    if (!da.targs) {
      daata2.push({ head: da.head, translate: '' })
      return console.log("[WARNING] ei targ", da)
    }

    if (!da.targs[0]) {
      daata2.push({ head: da.head, translate: '' })
      return console.log("[WARNING] ei targ indeksiä", da)
    }
    daata2.push({ head: da.head, translate: da.targs[0].targ })
  })

  const daata = daata2
  const sifter = new Sifter(daata);

  function handleChange (e) {
    setSearch(e.target.value)
    if (e.target.value === "") {
      setResults([])
      return
    }
    const result = sifter.search(e.target.value, {
      fields: ['head'],
      limit: 14
    });

    const things = result.items.map(it => {
      return daata[it.id]
    })
    console.log(things, result, daata)

    setResults(things)
  }

  return (
    <>
      <TextField value={search} onChange={handleChange} autoFocus label="Hae sanoja" fullWidth variant="outlined" size="small" />

      <div style={{marginTop: 10}}>
        {search !== "" && !results[0] && (
          <div style={{display: 'flex', alignItems: "center", alignContent: "center", minHeight: 150, justifyContent: 'center', textAlign: "center"}}>
            <p style={{fontSize: 14}}>Mitään ei löytynyt</p>
          </div>
        )}

        {search === "" && !results[0] && (
          <div style={{display: 'flex', alignItems: "center", alignContent: "center", minHeight: 150, justifyContent: 'center', textAlign: "center"}}>
            <p style={{fontSize: 14}}>Hae nyt jotain tosta</p>
          </div>
        )}

        {results.map(res => (
          <Result>
            <p style={{margin: 4}}>{res.head}</p>
            <p style={{margin: 4}}>{res.translate}</p>
          </Result>
        ))}
      </div>
    </>
  );
};

export default MaterialViewer;
