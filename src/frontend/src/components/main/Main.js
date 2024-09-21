import { useState, useEffect, useRef } from 'react';
import {
  Box, Divider, Typography, Stack, CircularProgress,
  IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BarChart } from '@mui/x-charts';
import { FullScreen } from 'react-full-screen';
import { DAY_LIST, RESOLUTION } from '../../config/environment';
import NatureRemoServices from '../../services/NatureRemoServices';
import ClimateService from '../../services/ClimateService';
import ConfigService from '../../services/ConfigService';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import { WiRainMix } from "react-icons/wi";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Main({ fullScreenHandle }) {

  const getNow = () => {
    let now = new Date();
    return {
      year: now.getFullYear(),
      month: String(now.getMonth() + 1).padStart(2, '0'),
      day: String(now.getDate()).padStart(2, '0'),
      hour: String(now.getHours()).padStart(2, '0'),
      minute: String(now.getMinutes()).padStart(2, '0'),
      second: String(now.getSeconds()).padStart(2, '0'),
      date: DAY_LIST[now.getDay()]
    }
  }

  const [config, setConfig] = useState({});

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const getConfig = () => {
    ConfigService.getConfig().then((data) => {
      setConfig(data)
    });
  }

  const getNatureRemoDeviceInfo = () => {
    // NatureRemoServices.getNatureRemoDeviceInfo(configRef.current.token.natureremo).then((deviceInfo) => {
    //   setDeviceInfo(deviceInfo);
    // });
  }

  const getClimateInfo = () => {
    ClimateService.getClimate().then((results) => {
      let climateInfo = [];
      for(let index in results['Feature'][0]['Property']['WeatherList']['Weather']) {
        let result = results['Feature'][0]['Property']['WeatherList']['Weather'][index];
        climateInfo.push({
          date: `${result['Date'].substring(8,10)}:${result['Date'].substring(10,12)}`,
          rainfall: result['Rainfall']
        });
      }
      console.log(climateInfo);
      setClimateInfo(climateInfo);
    });
  }

  const [now, setNow] = useState(() => getNow());
  const [deviceInfo, setDeviceInfo] = useState('');
  const [climateInfo, setClimateInfo] = useState('');
  const configRef = useRef(config);
  const env_icon_size = 38
  const env_gap = 2
  const divider_width = 8
  const valueFormatter = (value) => `${value}mm`;

  useEffect(() => {
    getConfig();
    // Initial batch
    const initialTimeout = setTimeout(() => {
      getNatureRemoDeviceInfo();
      getClimateInfo();
    }, 1000);
    // Polling batch
    const intervalNow = setInterval(() => {
      setNow(() => getNow());
    }, 1000);
    const intervalClimate = setInterval(() => {
      getClimateInfo();
    }, 600000);
    const intervalNatureremo = setInterval(() => {
      getNatureRemoDeviceInfo();
    }, 60000);
    // Process after unmount
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalNow);
      clearInterval(intervalClimate);
      clearInterval(intervalNatureremo);
    };
  }, []);

  return(
    <>
      <FullScreen handle={ fullScreenHandle }>
        <Grid container direction='column' alignItems='center' justifyContent='center' spacing={0}>
          <Box sx={{ height: RESOLUTION.height, width: RESOLUTION.width, border: 1 }}>
            <Grid container item direction='column' alignItems='center' justifyContent='center' spacing={0}>
              <Grid container item direction='row' alignItems='center' justifyContent='center' spacing={4}>
                <Grid item>
                  <Stack alignItems='center' justifyContent='flex-start' direction='row' gap={4}>
                    <Typography variant='h4'>{ `${now.year}/${now.month}/${now.day}` }</Typography>
                    <Typography variant='h4'>{ `${now.date}` }</Typography>
                  </Stack>
                  <Stack alignItems='center' justifyContent='flex-start' direction='row' gap={4}>
                    <Typography variant='h1'>{ `${now.hour}:${now.minute} ` }</Typography>
                    <Typography variant='h2'>{ now.second }</Typography>
                  </Stack>
                </Grid>
                <Divider flexItem sx={{ borderRightWidth: divider_width }} orientation='vertical'/>
                <Grid item>
                  <Stack alignItems='flex-start' justifyContent='center' direction='column' gap={3}>
                    <Stack justifyContent='end' direction='row'>
                      <IconButton color='white' onClick={ fullScreenHandle.exit }>
                        <ExitToAppIcon style={{ width: 50, height: 50, padding: 0 }}/>
                      </IconButton>
                    </Stack>
                    <Stack alignItems='flex-start' justifyContent='center' direction='column'>
                      {
                        deviceInfo === ''
                        ? <Stack alignItems='center' direction='row' gap={env_gap}>
                            <DeviceThermostatIcon style={{ fontSize: env_icon_size }}/>
                            <Typography variant='h4'>- ℃</Typography>
                          </Stack>
                        : <Stack alignItems='center' direction='row' gap={env_gap}>
                            <DeviceThermostatIcon style={{ fontSize: env_icon_size }}/>
                            <Typography variant='h4'>{ deviceInfo.te.val }℃</Typography>
                          </Stack>
                      }
                      {
                        deviceInfo === ''
                        ? <Stack alignItems='center' direction='row' gap={env_gap}>
                            <WaterDropIcon style={{ fontSize: env_icon_size }}/>
                            <Typography variant='h4'>- %</Typography>
                          </Stack>
                        : <Stack alignItems='center' direction='row' gap={env_gap}>
                            <WaterDropIcon style={{ fontSize: env_icon_size }}/>
                            <Typography variant='h4'>{ deviceInfo.hu.val }%</Typography>
                          </Stack>
                      }
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
              <Divider flexItem sx={{ borderBottomWidth: divider_width }}/>
              <Grid container item direction='row' alignItems='center' justifyContent='space-around' spacing={0}>
                <Grid item>
                  {
                    climateInfo === ''
                      ? <CircularProgress size={ 40 }/>
                      : <Box sx={{ width: '100%' }}>
                          <BarChart
                            series={[{ dataKey: 'rainfall', color: '#577399', valueFormatter}]}
                            xAxis={[{ scaleType: 'band', dataKey: 'date', label: 'Time' }]}
                            yAxis={[{ label: 'Rainfall (mm)', min: 0, max: 100 }]}
                            dataset={ climateInfo }
                            height={ 200 }
                            width={ 500 }
                          />
                        </Box>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </FullScreen>
    </>
  );
}

export default Main;
