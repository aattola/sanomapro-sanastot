import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'
import { useQuery, useQueryClient } from 'react-query';
import {
  Text, Timeline, Button, Card, Group, Badge, Alert,
} from '@mantine/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Release } from '../types/Settings';

const Container = styled.div`
  padding: 10px; 
  padding-top: 0px;
  max-width: 260px;
`;

function fetcher() {
  return fetch('https://api.github.com/repos/jeffeeeee/sanomapro-sanastot/releases').then((res) => res.json())
}

function SettingsView() {
  const queryClient = useQueryClient()
  const {
    data, error, isLoading, isError,
  } = useQuery<Release[]>('päivitykset', fetcher, {
    cacheTime: 1,
  })
  const [info, setInfo] = useState('');

  function flushCache() {
    localStorage.clear()
    queryClient.clear()
    setInfo('Cache poistettu')
  }

  function restart() {
    setInfo('Käynnistellään')
    chrome.runtime.reload()
  }

  function material() {
    localStorage.setItem('materialmode', String(true))
    chrome.runtime.reload()
  }

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.2 }}
      key="main"
    >
      <Container>
        {info && (
          <Alert style={{ marginBottom: 10 }} title="Ilmoitus" color="green" variant="outline">
            {info}
          </Alert>
        )}

        <Card shadow="sm" padding="lg" style={{ marginBottom: 30 }}>
          <Group position="apart" style={{ marginBottom: 5 }}>
            <Text weight={500}>Asetukset</Text>
          </Group>

          <Text size="sm" style={{ lineHeight: 1.5 }}>
            Tämmösiä asetuksia löytyy täältä. Myös päivitykset löytyvät sivun pohjasta.
          </Text>

          <Badge style={{ margin: '10px 0' }}>{chrome?.runtime?.id}</Badge>

          <Group style={{ marginTop: 5, gap: 10 }}>
            <Button onClick={flushCache} variant="outline">Poista cache</Button>
            <Button onClick={restart} variant="outline">Käynnistä uudelleen</Button>
          </Group>
        </Card>
        {/* <Button onClick={material} variant="outlined" style={{ marginTop: 5 }}>Material💅🏾💅🏾💅🏾✨🤩 mode</Button> */}

        {data && (data as any).message && (
          <p style={{ marginTop: 10 }}>Virhe tapahtui etsiessä päivityksiä. Yritä uudelleen kohta.</p>
        )}
        {data && !isLoading && !isError && !(data as any).message && (
          <Timeline style={{ marginTop: 15 }} active={0} bulletSize={24} lineWidth={2}>
            {data.map((release) => (
              <Timeline.Item key={release.id} bullet={<AddCircleIcon />} title={release.name}>
                <Text color="dimmed" size="sm">{release.body}</Text>
                <Text size="xs" style={{ marginTop: 4 }}>{release.created_at}</Text>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </Container>
    </motion.div>
  );
}

export default SettingsView;
