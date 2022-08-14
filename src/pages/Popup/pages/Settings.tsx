import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { observer } from 'mobx-react';
// eslint-disable-next-line import/no-duplicates
import { fi } from 'date-fns/locale';
// eslint-disable-next-line import/no-duplicates
import { formatDistance } from 'date-fns';

import {
  Text, Timeline, Button, Card, Group, Alert, Checkbox,
} from '@mantine/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Release } from '../types/Settings';
import extensionStore from '../Stores/ExtensionStore';

const Container = styled.div`
  //padding: 10px; 
  padding-top: 0px;
  //max-width: 290px;
  width: 100%;
  margin: 0 auto;
`;

function fetcher() {
  return fetch('https://api.github.com/repos/jeffeeeee/sanomapro-sanastot/releases').then((res) => res.json())
}

function SettingsView() {
  const queryClient = useQueryClient()
  const {
    data, isLoading, isError,
  } = useQuery<Release[]>(['päivitykset'], fetcher, {
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

  return (
  // <motion.div
  //   initial={{ x: 100, opacity: 0 }}
  //   animate={{ x: 0, opacity: 1 }}
  //   exit={{ x: -100, opacity: 0 }}
  //   transition={{ duration: 0.2 }}
  //   key="main"
  // >
    <Container>
      {info && (
        <Alert style={{ marginBottom: 10 }} title="Ilmoitus" color="green" variant="outline">
          {info}
        </Alert>
      )}

      <Card shadow="sm" p="lg" style={{ marginBottom: 30, zIndex: 1 }}>
        {/* <Group position="apart" style={{ marginBottom: 5 }}> */}
        {/*   <motion.div layoutId="kirjat"> */}
        {/*    <Text p={0} weight={500}>Asetukset</Text> */}
        {/*   </motion.div> */}
        {/* </Group> */}

        <Text size="sm" style={{ lineHeight: 1.5, marginBottom: 5 }}>
          Tämmösiä asetuksia löytyy täältä. Myös päivitykset löytyvät tuolta alempaa.
        </Text>

        {/* <Badge style={{ margin: '10px 0' }}>{chrome?.runtime?.id}</Badge> */}

        <Group style={{ marginTop: 5, gap: 10 }}>
          <Checkbox checked={extensionStore.theme === 'dark'} onChange={extensionStore.toggleTheme} label="Pimeämpi teema" />
          <Checkbox checked={extensionStore.listaMode} onChange={extensionStore.toggleMode} label="Jussin listamode" />
          <div style={{ width: 50 }} />
          <Button compact onClick={flushCache} variant="outline">Poista cache</Button>
          <Button compact onClick={restart} variant="outline">Käynnistä uudelleen</Button>
        </Group>
      </Card>
      {/* <Button onClick={material} variant="outlined" style={{ marginTop: 5 }}>Material💅🏾💅🏾💅🏾✨🤩 mode</Button> */}

      {data && (data as any).message && (
        <p style={{ marginTop: 10 }}>Virhe tapahtui etsiessä päivityksiä. Yritä uudelleen myöhemmin.</p>
      )}
      {data && !isLoading && !isError && !(data as any).message && (
      <Timeline style={{ marginTop: 15 }} active={0} bulletSize={24} lineWidth={2}>
        {data.map((release) => (
          <Timeline.Item key={release.id} bullet={<AddCircleIcon />} title={release.name}>
            <Text color="dimmed" size="sm">{release.body}</Text>
            <Text size="xs" style={{ marginTop: 4 }}>
              {formatDistance(
                new Date(release.created_at),
                new Date(),
                { locale: fi, addSuffix: true },
              )}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
      )}
    </Container>
  // </motion.div>
  );
}

export default observer(SettingsView);
