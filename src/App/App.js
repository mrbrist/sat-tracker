import React, { useEffect, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Dialog, DialogContent, DialogTitle, DialogActions, Button, Grid, Typography, TextField, AppBar, Toolbar, Autocomplete } from '@mui/material';

import Map from 'C:/dev/sat-tracker/src/components/Map.js'

import './App.css';

const sats = require("./sats.json")

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const [data, setData] = useState();
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState(25544);

  useEffect(() => {
    fetch(`rest/v1/satellite/positions/${id}/41.702/-76.014/0/2&apiKey=UU6K2M-9GE4WA-DSB4BX-542I`, {
      method: "GET",
      mode: "no-cors"
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleClickOpen = () => {
    setPopup(true);
  }

  const handleClose = () => {
    setPopup(false);
  };

  const calculateSpeed = () => {
    const lat1 = data?.positions[0].satlatitude
    const lon1 = data?.positions[0].satlongitude
    const lat2 = data?.positions[1].satlatitude
    const lon2 = data?.positions[1].satlongitude
    const alt = data?.positions[0].sataltitude
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
            {/* <TextField variant="outlined" label="Search" margin="normal" onKeyPress={event => {
              if (event.key === 'Enter') {
                if (event.target.value.match(/[0-9]/)) {
                  setId(event.target.value)
                }
              }
            }} /> */}
            <Autocomplete
              disablePortal
              options={sats}
              getOptionLabel={(option) => option.label ?? option}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search" margin="normal" />}
              onChange={(event, newValue) => {
                if (newValue) {
                  setId(newValue.id)
                }
              }}
            />
          </Toolbar>
        </AppBar>

        {data ? (<Map data={data} click={handleClickOpen} status={data?.info.satname && data?.positions[0].sataltitude === 0 ? ("dead") : (data?.info.satname ? ("alive") : ("notfound"))} />) : "loading"}

        {popup ? (
          <Dialog open={popup} onClose={handleClose}>
            <DialogTitle>{data?.info.satname ? (data?.info.satname) : ("Not Found")}</DialogTitle>
            <DialogContent>
              {data?.info.satname && data?.positions[0].sataltitude === 0 ? ("Decayed") : (
                <Grid container spacing={4} >
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" component="h2">Altitude</Typography>
                    <Typography display="inline-block" variant="h4" component="h2">{Math.round(data?.positions[0].sataltitude)}</Typography> <Typography display="inline-block" variant="h6" component="h2">Km</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" component="h2">Speed</Typography>
                    <Typography display="inline-block" variant="h4" component="h2">{data?.info.satname ? (calculateSpeed()) : ("0")}</Typography> <Typography display="inline-block" variant="h6" component="h2">Km/s</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" component="h2">Latitude</Typography>
                    <Typography variant="h4" component="h2">{data?.positions[0].satlatitude}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" component="h2">Longitude</Typography>
                    <Typography variant="h4" component="h2">{data?.positions[0].satlongitude}</Typography>
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
