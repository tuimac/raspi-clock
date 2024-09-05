import { useState, useEffect } from 'react';
import {
  Box, Divider, Grid, Typography, Stack
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
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`,
      date: DAY_LIST[now.getDay()]
    }
  }

  const getConfig = async () => {
    await ConfigService.getConfig().then((config) => {
      setConfig(config);
    });
  }

  const getNatureRemoDeviceInfo = async () => {
    if (Object.keys(config.token).indexOf('natureremo') !== -1) {
      return await NatureRemoServices.getNatureRemoDeviceInfo(config.token.natureremo).then((deviceInfo) => {
        setDeviceInfo(deviceInfo);
      });
    } else {
      setDeviceInfo('');
    }
  }

  const getClimateInfo = async () => {
    await ClimateService.getClimate().then((climateInfo) => {
      setClimateInfo(climateInfo['Feature'][0]['Property']['WeatherList']['Weather'])
    });
  }

  const [config, setConfig] = useState({});
  const [now, setNow] = useState(() => getNow());
  const [deviceInfo, setDeviceInfo] = useState('');
  const [climateInfo, setClimateInfo] = useState('');
  const env_icon_size = 38
  const env_gap = 2
  const divider_width = 8

  useEffect(() => {
    getConfig();
    getNatureRemoDeviceInfo();
    getClimateInfo();
    setInterval(() => {
      setNow(() => getNow());
    }, 1000);
    setInterval(() => {
      getClimateInfo();
    }, 600000);
    setInterval(() => {
      getNatureRemoDeviceInfo();
    }, 60000);
  }, []);

  return(
    <>
      <FullScreen handle={ fullScreenHandle }>
        <Grid container direction='column' alignItems='center' justifyContent='center'>
          <Box sx={{ display: 'flex', height: RESOLUTION.height, width: RESOLUTION.width }}>
            <Grid container item direction='column' alignItems='center' justifyContent='flex-start' spacing={2}>
              <Grid container item direction='row' alignItems='center' justifyContent='space-around' spacing={2}>
                <Grid item>
                  <Typography variant='h4'>{ `${now.year}/${now.month}/${now.day}` }</Typography>
                  <Stack alignItems='center' justifyContent='center' direction='row' gap={4}>
                    <Typography variant='h1'>{ `${now.hour}:${now.minute} ` }</Typography>
                    <Typography variant='h2'>{ now.second }</Typography>
                  </Stack>
                </Grid>
                <Divider flexItem sx={{ borderRightWidth: divider_width }} orientation='vertical'/>
                <Grid item>
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
