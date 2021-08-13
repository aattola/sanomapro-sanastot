import React, { useState } from 'react';
import { Button } from '@material-ui/core'

import useSWR from 'swr'
import styled from 'styled-components'
import Lockr from 'lockr'

import TextField from '@material-ui/core/TextField'

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
       if (a[i].id === obj.materialId) {
           return true;
       }
    }
    return false;
}

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const MaterialSelector = ({ setMaterial, setView }) => {
  const { data, error } = useSWR('https://sanastot.sanomapro.fi/api/v1/materials')
  const forceUpdate = useForceUpdate();
  // const [view, setView] = useState('selector')

  function asetaMateriaali (materiaali) {
    setMaterial(materiaali)
    setView("viewer")
  }

  function handleContext (e, material, add = true) {
    e.preventDefault()
    console.log(e, material, add)
    if (!add) {
      Lockr.rm(material.materialId)
      forceUpdate()
      return
    }

    if (Lockr.get(material.materialId)) {
      Lockr.rm(material.materialId)
      forceUpdate()
      return
    }

    Lockr.set(material.materialId, {favorite: add, id: material.materialId})

    forceUpdate()
  }

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const fav = Lockr.getAll()


  console.log(fav)

  return (
    <>
      <TextField autoFocus label="Hae kirjoista" fullWidth variant="outlined" size="small" />

      {fav[0] && <Teksti>Lempparit:</Teksti>}
      <Grid style={{marginBottom: fav[0] ? "10px" : 0}}>
        {data.map(material => {
          if (contains(fav, material)) {
            return (
              <MaterialCard onContextMenu={(e) => handleContext(e, material, false)} onClick={() => asetaMateriaali(material)} image={material.coverImages.small.url} key={material.productId}>
                {/* <p>{material.materialId}</p> */}
              </MaterialCard>
            )
          }
        })}
      </Grid>

      <Teksti>Kirjat:</Teksti>
      <Grid>
        {data.map(material => (
          <MaterialCard onContextMenu={(e) => handleContext(e, material)} onClick={() => asetaMateriaali(material)} image={material.coverImages.small.url} key={material.productId}>
            {/* <p>{material.materialId}</p> */}
          </MaterialCard>
        ))}
      </Grid>
    </>
  );
};

export default MaterialSelector;
