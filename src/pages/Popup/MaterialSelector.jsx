import React, { useState } from 'react';
import { Button } from '@material-ui/core'

import useSWR from 'swr'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`

const MaterialCard = styled.div`
  border-radius: 4px;
  background-image: url(${props => props.image});

  min-height: 120px;
  background-position: center;
  background-size: cover;
  cursor: pointer;
`

const MaterialSelector = ({ setMaterial, setView }) => {
  const { data, error } = useSWR('https://sanastot.sanomapro.fi/api/v1/materials')
  // const [view, setView] = useState('selector')

  function asetaMateriaali (materiaali) {
    setMaterial(materiaali)
    setView("viewer")
  }

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>



  return (
    <>
      <Grid>
        {data.map(material => (
          <MaterialCard onClick={() => asetaMateriaali(material)} image={material.coverImages.small.url} key={material.productId}>
            {/* <p>{material.materialId}</p> */}
          </MaterialCard>
        ))}
      </Grid>
    </>
  );
};

export default MaterialSelector;
