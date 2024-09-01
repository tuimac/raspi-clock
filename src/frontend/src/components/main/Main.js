import { useState, useEffect } from 'react';
import {
  Box, Divider, Grid, Typography, Stack
} from '@mui/material';
import { FullScreen } from 'react-full-screen';
import { DAY_LIST, RESOLUTION } from '../../config/environment';
import NatureRemoServices from '../../services/NatureRemoServices';
import ClimateService from '../../services/ClimateService';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
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

  const getNatureRemoDeviceInfo = async () => {
    // const token = await NatureRemoServices.getNatureRemoToken();
    // if (token !== '') {
    //   return await NatureRemoServices.getNatureRemoDeviceInfo(token).then((deviceInfo) => {
    //     setDeviceInfo(deviceInfo);
    //   });
    // } else {
    //   setDeviceInfo('');
    // }
  }

  const getClimateInfo = async () => {
    // const token = await ClimateService.getClimateToken();
    // if (token !== '') {
    //   await ClimateService.getClimateInfo(token).then((climateInfo) => {
    //     setClimateInfo(climateInfo)
    //   });
    // } else {
    //   setClimateInfo('');
    // }
  }

  const [now, setNow] = useState(() => getNow());
  const [deviceInfo, setDeviceInfo] = useState('');
  const [climateInfo, setClimateInfo] = useState('');
  const env_icon_size = 38
  const env_gap = 2
  const divider_width = 8

  useEffect(() => {
    getNatureRemoDeviceInfo();
    getClimateInfo();
    setInterval(() => {
      setNow(() => getNow());
    }, 1000);
    setInterval(() => {
      getNatureRemoDeviceInfo();
    }, 60000);
    setInterval(() => {
      getClimateInfo();
    }, 60000);
  }, []);

  return(
    <>
      <FullScreen handle={ fullScreenHandle }>
        <Grid container direction='column' alignItems='center' justifyContent='center'>
          <Box sx={{ display: 'flex', height: RESOLUTION.height, width: RESOLUTION.width }}>
            <Grid container item direction='column' alignItems='center' justifyContent='center' spacing={2}>
              <Grid container item direction='row' alignItems='center' justifyContent='space-around' spacing={2}>
                <Grid item>
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
                        <Typography variant='h4'> { deviceInfo.hu.val }%</Typography>
                      </Stack>
                  }
                </Grid>
              </Grid>
              <Divider flexItem sx={{ borderBottomWidth: divider_width }}/>
              <Grid container item direction='row' alignItems='flex-start' justifyContent='space-around' xs={6} spacing={2}>
                <Grid item>
                  <Typography variant='h2'>{ `${now.year}/${now.month}/${now.day}` }</Typography>
                </Grid>
                <Divider flexItem sx={{ borderRightWidth: divider_width }} orientation='vertical'/>
                <Grid item>
                  <Typography variant='h2'>{ climateInfo.toString() }</Typography>
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
