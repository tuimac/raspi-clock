import { useState, useEffect, useRef } from 'react';
import {
  Box, Button, Divider, Grid, Typography, Stack,
  IconButton
} from '@mui/material';
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
    // ClimateService.getClimate().then((climateInfo) => {
    //   setClimateInfo(climateInfo['Feature'][0]['Property']['WeatherList']['Weather'])
    // });
  }

  const [now, setNow] = useState(() => getNow());
  const [deviceInfo, setDeviceInfo] = useState('');
  const [climateInfo, setClimateInfo] = useState('');
  const configRef = useRef(config);
  const env_icon_size = 38
  const env_gap = 2
  const divider_width = 8

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
          <Box sx={{ display: 'flex', height: RESOLUTION.height, width: RESOLUTION.width, border: 1 }}>
            <Grid container item direction='column' alignItems='center' justifyContent='flex-start' spacing={0}>
              <Grid container item direction='row' alignItems='center' justifyContent='space-around' spacing={0}>
                <Grid item>
                  <Stack alignItems='center' justifyContent='flex-start' direction='row' gap={4}>
                    <Typography variant='h4'>{ `${now.year}/${now.month}/${now.day}` }</Typography>
                    <Typography variant='h4'>{ `${now.date}` }</Typography>
                  </Stack>
                  <Stack alignItems='center' justifyContent='center' direction='row' gap={4}>
                    <Typography variant='h1'>{ `${now.hour}:${now.minute} ` }</Typography>
                    <Typography variant='h2'>{ now.second }</Typography>
                  </Stack>
                </Grid>
                <Divider flexItem sx={{ borderRightWidth: divider_width }} orientation='vertical'/>
                <Grid item>
                  <Stack alignItems='flex-start' justifyContent='flex-start' direction='column' gap={3}>
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
              <Grid item>
                <Stack alignItems='center' justifyContent='center' direction='row' gap={2}>
                  {
                    Object.keys(climateInfo).map(index => {
                      let timestamp = `${climateInfo[index]['Date'].substring(8,10)}:${climateInfo[index]['Date'].substring(10,12)}`;
                      return (
                        <Stack alignItems='center' justifyContent='center' direction='column' key={ `${index}_stack` }>
                          <Typography variant='h5' key={ `${index}_time` }>{ timestamp }</Typography>
                          {
                            climateInfo[index]['Rainfall'] < 20
                              ? <WbSunnyIcon style={{ fontSize: env_icon_size }} key={ `${index}_sunny` }/>
                              : climateInfo[index]['Rainfall'] < 50
                                  ? <WbCloudyIcon style={{ fontSize: env_icon_size }} key={ `${index}_cloudy` }/>
                                  : <WiRainMix style={{ fontSize: env_icon_size }} key={ `${index}_rain` }/>
                          }
                          <Typography variant='h5' key={ `${index}_rainfall` }>{ climateInfo[index]['Rainfall'] }%</Typography>
                        </Stack>
                      )
                    })
                  }
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </FullScreen>
    </>
  );
}

export default Main;
