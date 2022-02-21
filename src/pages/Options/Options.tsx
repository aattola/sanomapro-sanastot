import React, { useEffect } from 'react';
import './Options.css';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

const Options = (props: any) => {
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    chrome.storage.sync.get('dev', function (data) {
      setChecked(data.dev);
      setLoading(false);
    });
  }, []);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);

    chrome.storage.sync.set({ dev: event.target.checked }, function () {
      console.log('dev is set to ' + event.target.checked);
    });
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      className="OptionsContainer"
    >
      <h1>Asetukset</h1>

      <FormControlLabel
        control={
          loading ? (
            <p>Odotappa hetki</p>
          ) : (
            <Switch checked={checked} onChange={handleChange} />
          )
        }
        label="Postaa konsole täyteen tavaraa"
      />

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
