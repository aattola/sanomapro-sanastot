import React, { useState, useEffect } from 'react';
import Sifter from 'sifter'

import useSWR from 'swr'
import styled from 'styled-components'
import Lockr from 'lockr'

import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;

  margin-bottom: 10px;
`

const Teksti = styled.div`
  font-size: 14px;
  margin: 10px 0px;
`

const MaterialCard = styled.button`
  border-radius: 4px;
  background-image: url(${props => props.image});

  min-height: 120px;
  background-position: center;
  background-size: cover;
  cursor: pointer;

  outline: 0px solid black;
  border: 0px solid black;
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);

  :active {
    box-shadow: 0px 4px 28px rgb(0 0 0 / 10%), 0px 4px 10px rgb(0 0 0 / 11%) !important;
    transform: translate3d(0px, 0px, 0px) !important;
  }

  :hover {
    transform: translate3d(0px, -3px, 0px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2), 0 8px 10px rgba(0, 0, 0, 0.2);
  }

  :focus {
    transform: translate3d(0px, -3px, 0px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2), 0 8px 10px rgba(0, 0, 0, 0.2);
    /* border-bottom: 4px solid #86a1ff; */
  }
`

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i].id === obj.productId) {
           return true;
       }
    }
    return false;
}

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

let menestystä = false

const MaterialSelector = ({ setMaterial, setView }) => {
  const { data: dahta, error } = useSWR('https://sanastot.jeffe.workers.dev/sanastot', {revalidateOnFocus: false})
  const forceUpdate = useForceUpdate();
  const [results, setResults] = useState([])
  const [errori, setError] = useState([])
  const [mat, setMat] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const mat = Lockr.get("materials")
    console.log(mat, "MATTRIa")
    if (mat) {
      setData(mat)
    } else {
      Lockr.set('materials', dahta)
      setData(dahta)
    }
  }, [dahta])


  // const data = mat[0] ? mat : dahta

  console.log(data, !data)
  // const [view, setView] = useState('selector')

  function asetaMateriaali (materiaali) {
    setMaterial(materiaali)
    setView("viewer")
  }

  function handleContext (e, material, add = true) {
    menestystä = false
    e.preventDefault()
    const favvorites = Lockr.get("favorites") ? Lockr.get("favorites") : []
    console.log(e, material, add)

    favvorites.forEach((a, i) => {
      if (a.productId !== material.productId) return

      favvorites.splice(i, 1);
      Lockr.set("favorites", favvorites)
      forceUpdate()
      menestystä = true
      return
    })

    if (!menestystä) {
      favvorites.push(material)
      Lockr.set("favorites", favvorites)
      forceUpdate()
    }
  }

  if (error) return <div>Lataus ei onnannut</div>
  if (!data) {
    return (
      <div style={{display: 'flex', alignItems: "center", alignContent: "center", height: 200, justifyContent: 'center'}}>
        <CircularProgress />
      </div>
    )
  }

  const fav = Lockr.get("favorites") ? Lockr.get("favorites") : []

  const sifter = new Sifter(data);

  // Lockr.set('materials', dahta)

  return (
    <>
      <TextField onChange={(e) => {
        if (e.target.value === '') {
          setError([])
          return setResults([])
        }
        const result = sifter.search(e.target.value, {
          fields: ['materialTitle'],
          limit: 9
        });

        if (result.total === 0) return setError(["Jäbä mitään ei löytynyt"])
        errori[0] && setError([])

        const things = result.items.map(it => {
          return data[it.id]
        })
        console.log(things, result)
        setResults(things)
      }} autoFocus label="Hae kirjoista" fullWidth variant="outlined" size="small" />

      {fav[0] && <Teksti>Lempparit:</Teksti>}
      <Grid style={{marginBottom: fav[0] ? "10px" : 0}}>
        {fav.map(material => {
          {/* if (contains(fav, material)) { */}
            return (
              <MaterialCard onContextMenu={(e) => handleContext(e, material, false)} onClick={() => asetaMateriaali(material)} image={material.coverImages.small.url} key={material.productId}>
                {/* <p>{material.materialId}</p> */}
              </MaterialCard>
            )
          {/* } */}
        })}
      </Grid>

      <Teksti>Kirjat:</Teksti>
      {errori[0] ? (
        <div style={{display: 'flex', alignItems: "center", alignContent: "center", minHeight: 150, justifyContent: 'center', textAlign: "center"}}>
          <h2>{errori[0]}</h2>
        </div>
      ) : (
        <Grid>
          {results[0] ? results.map(material => (
            <MaterialCard onContextMenu={(e) => handleContext(e, material)} onClick={() => asetaMateriaali(material)} image={material.coverImages.small.url} key={material.productId}>
              {/* <p>{material.materialId}</p> */}
            </MaterialCard>
          )) : data.map(material => (
            <MaterialCard onContextMenu={(e) => handleContext(e, material)} onClick={() => asetaMateriaali(material)} image={material.coverImages.small.url} key={material.productId}>
              {/* <p>{material.materialId}</p> */}
            </MaterialCard>
          ))}
        </Grid>
      )}
    </>
  );
};

export default MaterialSelector;
