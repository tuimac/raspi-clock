import { useState, useEffect } from 'react';
import {
  Box, Grid, Typography, TextField, Stack
} from '@mui/material';
import { RESOLUTION } from '../../config/environment';
import ClimateService from '../../services/ClimateService';

function Config() {

  const [config, setConfig] = useState({});
  const [latitude, setLatitude] = useState(config.latitude);
  const [longitude, setLongitude] = useState(config.longitude);

  useEffect(() => {
    ClimateService.getClimateConfig().then((data) => setConfig(data));
  }, []);

  return(
    <>
      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Box sx={{ display: 'flex', height: RESOLUTION.height, width: RESOLUTION.width }}>
          <Grid container item direction='column' alignItems='center' justifyContent='flex-start' spacing={2}>
            <Grid item>
              <Typography variant='h5'>■ Coordination for Climate API</Typography><br />
              <Stack direction='row' spacing={2}>
                <TextField
                  label='Latitude'
                  id='Latitude'
                  onChange={ (e) => setLatitude(e.target.value) }
                  sx={{ width: RESOLUTION.width * 0.3 }}
                />
                <TextField
                  label='Longitude'
                  id='Longitude'
                  onChange={ (e) => setLongitude(e.target.value) }
                  sx={{ width: RESOLUTION.width * 0.3 }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default Config;