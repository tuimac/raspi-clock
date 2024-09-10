import { useState, useEffect } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Box, Grid, Typography, TextField, Stack, Button,
  Slider
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { RESOLUTION } from '../../config/environment';
import ConfigService from '../../services/ConfigService';

function Config() {

  const [config, setConfig] = useState({});
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [yahooApiKey, setYahooApiKey] = useState('');
  const [natureRemoKey, setNatureRemoKey] = useState('');
  const [brightness, setBrightness] = useState(0);
  const [brightnessMax, setBrightnessMax] = useState(0);

  useEffect(() => {
    ConfigService.getConfig().then((data) => {
      setConfig(data);
      setLatitude(data.climate.latitude);
      setLongitude(data.climate.longitude);
      setYahooApiKey(data.token.yahoo);
      setNatureRemoKey(data.token.natureremo);
    });
    ConfigService.getBrightness().then((brightness) => {
      setBrightnessMax(brightness.max_brightness);
      setBrightness(Math.ceil(brightness.max_brightness / brightness.brightness / 10) * 10);
    })
  }, []);

  const updateBrightness = async (event, newBrightness) => {
    setBrightness(newBrightness);
    ConfigService.updateBrightness(brightnessMax * newBrightness / 100);
  }

  return(
    <>
      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Box sx={{ display: 'flex', width: RESOLUTION.width }}>
          <Grid container item direction='column' alignItems='center' justifyContent='center' spacing={2}>
            <Grid item>
              <Accordion sx={{ width: RESOLUTION.width * 0.7 }}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls='climate-coordinate'
                  id='climate-coordinate'
                >
                  <Typography variant='h5'>Coordination for Climate API</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item>
              <Accordion sx={{ width: RESOLUTION.width * 0.7 }}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls='yahoo-api-token'
                  id='yahoo-api-token'
                >
                  <Typography variant='h5'>Yahoo API Key</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    id='yahoo_api'
                    type='password'
                    value={ yahooApiKey || '' }
                    onChange={ (e) => setYahooApiKey(e.target.value) }
                    sx={{ width: RESOLUTION.width * 0.62 }}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item>
              <Accordion sx={{ width: RESOLUTION.width * 0.7 }}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls='natureremo-api-token'
                  id='natureremo-api-token'
                >
                  <Typography variant='h5'>NatureRemo API Key</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    id='natureremo-api'
                    type='password'
                    value={ natureRemoKey || '' }
                    onChange={ (e) => setNatureRemoKey(e.target.value) }
                    sx={{ width: RESOLUTION.width * 0.62 }}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item>
              <Accordion sx={{ width: RESOLUTION.width * 0.7 }}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls='screen-brightness'
                  id='screen-brightness'
                >
                  <Typography variant='h5'>Screen Brightness</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Slider
                    aria-label='brightness'
                    value={ brightness }
                    valueLabelDisplay='auto'
                    onChange={ updateBrightness }
                    step={10}
                    marks
                    min={0}
                    max={100}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item>
              <Accordion sx={{ width: RESOLUTION.width * 0.7 }}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls='shutdown'
                  id='shutdown'
                >
                  <Typography variant='h5'>Shutdown</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction='column' alignItems='center' justifyContent='center'>
                    <Grid>
                      <Button
                        variant='contained'
                        onClick={() => {
                          ConfigService.sendCommands('sudo shutdown -h now');
                        }}
                      >
                        Shutdown
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
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