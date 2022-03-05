import React, { useEffect } from 'react';
import './Options.css';

import { Button } from '@mantine/core'

const Options = (props: any) => {
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    chrome.storage.sync.get('dev', (data) => {
      setChecked(data.dev);
      setLoading(false);
    });
  }, []);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);

    chrome.storage.sync.set({ dev: event.target.checked }, () => {
      console.log(`dev is set to ${event.target.checked}`);
    });
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      className="OptionsContainer"
    >
      <h1>Asetukset</h1>

      <Button
        onClick={() => {
          chrome.storage.sync.clear(() => {
            console.log('RESETATTU');
            alert('resetattu');
            window.location.reload();
          });
        }}
      >
        Resetoi lisäosan muisti
      </Button>

      <Button
        style={{ marginTop: 10 }}
        onClick={() => {
          window.localStorage.clear();
        }}
      >
        Resetoi local storage
      </Button>
    </div>
  );
};

export default Options;
