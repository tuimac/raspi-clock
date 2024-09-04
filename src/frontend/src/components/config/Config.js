import { useState, useEffect } from 'react';
import {
  Box, Grid, Typography, TextField, Stack, Button
} from '@mui/material';
import { RESOLUTION } from '../../config/environment';
import ConfigService from '../../services/ConfigService';

function Config() {

  const [config, setConfig] = useState({});
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [yahooApiKey, setYahooApiKey] = useState('');
  const [natureRemoKey, setNatureRemoKey] = useState('');

  useEffect(() => {
    ConfigService.getConfig().then((data) => {
      setConfig(data);
      setLatitude(data.climate.latitude);
      setLongitude(data.climate.longitude);
      setYahooApiKey(data.token.yahoo);
      setNatureRemoKey(data.token.natureremo);
    });
  }, []);

  return(
    <>
      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Box sx={{ display: 'flex', width: RESOLUTION.width }}>
          <Grid container item direction='column' alignItems='center' justifyContent='center' spacing={5}>
            <Grid item>
              <Typography variant='h5'>■ Coordination for Climate API</Typography>
              <Stack direction='row' spacing={2}>
                <TextField
                  label='Latitude'
                  id='Latitude'
                  value={ latitude || '' }
                  onChange={ (e) => setLatitude(e.target.value) }
                  sx={{ width: RESOLUTION.width * 0.3 }}
                />
                <TextField
                  label='Longitude'
                  id='Longitude'
                  value={ longitude || '' }
                  onChange={ (e) => setLongitude(e.target.value) }
                  sx={{ width: RESOLUTION.width * 0.3 }}
                />
              </Stack>
            </Grid>
            <Grid item>
              <Typography variant='h5'>■ Yahoo API Key</Typography>
              <TextField
                id='yahoo_api'
                type='password'
                value={ yahooApiKey || '' }
                onChange={ (e) => setYahooApiKey(e.target.value) }
                sx={{ width: RESOLUTION.width * 0.62 }}
              />
            </Grid>
            <Grid item>
              <Typography variant='h5'>■ NatureRemo API Key</Typography>
              <TextField
                id='natureremo_api'
                type='password'
                value={ natureRemoKey || '' }
                onChange={ (e) => setNatureRemoKey(e.target.value) }
                sx={{ width: RESOLUTION.width * 0.62 }}
              />
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                onClick={() => {
                  config['climate']['latitude'] = latitude;
                  config['climate']['longitude'] = longitude;
                  config['token']['yahoo'] = yahooApiKey;
                  config['token']['natureremo'] = natureRemoKey;
                  ConfigService.saveConfig(config);
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default Config;