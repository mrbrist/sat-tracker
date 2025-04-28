import React, { useEffect, useState } from 'react';
import axios from 'axios'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Dialog, DialogContent, DialogTitle, DialogActions, Button, Grid, Typography, TextField, AppBar, Toolbar, Autocomplete } from '@mui/material';

import Map from '../components/Map.js'

import './App.css';

const sats = require("./sats.json")

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const [data, setData] = useState();
  const [selectedData, setSelectedData] = useState();
  const [popup, setPopup] = useState(false);
  const [objects, setObjects] = useState([25544, 20580]);

  useEffect(() => {
    const refresh = () => {
      const newData = [];
      const promises = objects.map(e =>
        axios.get(`https://api.n2yo.com/rest/v1/satellite/positions/${e}/41.702/-76.014/0/2&apiKey=UU6K2M-9GE4WA-DSB4BX-542I`)
      );
      Promise.all(promises).then(function (res) {
        res.forEach(obj => {
          newData.push(obj.data);
        });

        setData(newData);
      });
    };

    refresh();

    const interval1 = setInterval(() => {
      refresh();
    }, 30 * 1000); // Every 30 seconds
    return () => clearInterval(interval1);
  }, [objects]);

  const handleClickOpen = (sat) => {
    console.log(sat);
    setSelectedData(sat)
    setPopup(true);
  }

  const handleClose = () => {
    setPopup(false);
  };

  const calculateSpeed = (data) => {
    const lat1 = data.positions[0].satlatitude
    const lon1 = data.positions[0].satlongitude
    const lat2 = data.positions[1].satlatitude
    const lon2 = data.positions[1].satlongitude
    const alt = data.positions[0].sataltitude
    const distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2, alt)

    return Math.round(distance * 100) / 100
  };

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2, alt) {
    var R = (12742 / 2) + alt; // Radius of the earth in km
    var j = 398600.5; //Standard Gravitational Parameter
    var v = Math.sqrt(j / R); // Velocity
    return v;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Satellite Tracker
            </Typography>
            <Autocomplete
              disablePortal
              multiple
              options={sats}
              getOptionLabel={(option) => option.label ?? option}
              renderInput={(params) => <TextField {...params} label="Search" margin="normal" />}
              defaultValue={[sats[67], sats[24]]}
              onChange={(event, newValue) => {
                console.log(newValue);
                if (newValue) {
                  const array = []
                  newValue.forEach(e => {
                    array.push(e.id)
                  });
                  setObjects(array)
                }
              }}
            />
          </Toolbar>
        </AppBar>
        {data ? (<Map data={data} click={handleClickOpen} status={data[0]?.info.satname && data[0]?.positions[0].sataltitude === 0 ? ("dead") : (data[0]?.info.satname ? ("alive") : ("notfound"))} />) : "loading"}

        {popup && selectedData ? (
          <Dialog open={popup} onClose={handleClose}>
            <DialogTitle>{selectedData?.info.satname ? (selectedData?.info.satname) : ("Not Found")}</DialogTitle>
            <DialogContent>
              {selectedData?.info.satname && selectedData?.positions[0].sataltitude === 0 ? ("Decayed") : (
                <Grid container spacing={4} >
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" component="h2">Altitude</Typography>
                    <Typography display="inline-block" variant="h4" component="h2">{Math.round(selectedData?.positions[0].sataltitude)}</Typography> <Typography display="inline-block" variant="h6" component="h2">Km</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" component="h2">Speed</Typography>
                    <Typography display="inline-block" variant="h4" component="h2">{selectedData?.info.satname ? (calculateSpeed(selectedData)) : ("0")}</Typography> <Typography display="inline-block" variant="h6" component="h2">Km/s</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" component="h2">Latitude</Typography>
                    <Typography variant="h4" component="h2">{selectedData?.positions[0].satlatitude}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" component="h2">Longitude</Typography>
                    <Typography variant="h4" component="h2">{selectedData?.positions[0].satlongitude}</Typography>
                  </Grid>
                </Grid>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        ) :
          null}
      </main>
    </ThemeProvider >
  );
};

export default App;
