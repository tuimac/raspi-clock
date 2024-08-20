import { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Typography
} from '@mui/material';
import { FullScreen } from "react-full-screen";

function Main({ fullScreenHandle }) {

  const getNow = () => {
    let now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  }

  const updateNow = () => {
    setIntervalFunc(() => setInterval(() => {
      setNow(() => getNow());
    }, 1000));
  }

  const [now, setNow] = useState(() => getNow());
  const [interval, setIntervalFunc] = useState('');

  useEffect(() => {
    updateNow();
  }, []);

  return(
    <>
      <FullScreen handle={ fullScreenHandle }>
        <Grid container direction='column' alignItems='center' justifyContent='center' spacing={5}>
          <Grid item>
            <Card>
              <Typography variant="h1">{ now }</Typography>
            </Card>
          </Grid>
        </Grid>
      </FullScreen>
    </>
  );
}

export default Main;
