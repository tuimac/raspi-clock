import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import { FullScreen } from "react-full-screen";
import { DAY_LIST } from "../../config/environment";

function Main({ fullScreenHandle }) {

  const getNow = () => {
    let now = new Date();
    return {
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`,
      date: `${now.getFullYear()}/${String(now.getMonth()).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${DAY_LIST[now.getDay()]}`
    }
  }

  const getNatureRemo = () => {
    
  }

  const [now, setNow] = useState(() => getNow());
  const [interval, setIntervalFunc] = useState('');

  useEffect(() => {
    setIntervalFunc(() => setInterval(() => {
      setNow(() => getNow());
    }, 1000));
  }, []);

  return(
    <>
      <FullScreen handle={ fullScreenHandle }>
        <Box sx={{ height: window.innerHeight, width: window.innerWidth }}>
          <Grid container direction='column' alignItems='center' justifyContent='center' spacing={5}>
            <Grid container item direction='row' alignItems='center' justifyContent='center' xs={6} spacing={5}>
              <Grid item>
                <Typography variant="h1">{ now.time }</Typography>
                <Typography variant="h2">{ now.date }</Typography>
              </Grid>
            </Grid>
            <Grid container item direction='row' alignItems='center' justifyContent='center' xs={6} spacing={5}>
              <Grid item>
                <Typography variant="h1">{ now.time }</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h2">{ now.date }</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FullScreen>
    </>
  );
}

export default Main;
