import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import * as satellite from 'satellite.js';
import SatMarker from './SatMarker';

const Map = ({ data, click, status, lat, lng }) => {
    const defaultProps = {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 2.5
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyD_gaH-BnlRksIo_GJTmbQ-2uwn9i80S7o"
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    function calculateLatLon(d) {
        // Define the TLE lines using the provided variables
        const tleLine1 = d.split("\n")[1];
        const tleLine2 = d.split("\n")[2];
      
        // Parse the TLE lines
        const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
      
        // Get the current time
        const now = new Date();
      
        // Propagate the satellite's position
        const positionAndVelocity = satellite.propagate(satrec, now);
      
        // Extract the ECI position
        const positionEci = positionAndVelocity.position;
      
        // Calculate GMST (Greenwich Mean Sidereal Time)
        const gmst = satellite.gstime(now);
      
        // Convert ECI to geodetic coordinates (latitude, longitude, altitude)
        const positionGd = satellite.eciToGeodetic(positionEci, gmst);
      
        // Convert latitude and longitude from radians to degrees
        const latitude = satellite.degreesLat(positionGd.latitude);
        const longitude = satellite.degreesLong(positionGd.longitude);
        const altitude = positionGd.height; // Altitude in kilometers
        const velocity = positionAndVelocity.velocity;
      
        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Altitude: ${altitude} km`);
        return { latitude, longitude, altitude, velocity };
      };

    return (
        <div className="map">
            <GoogleMap
                center={defaultProps.center}
                zoom={defaultProps.zoom}
                mapContainerStyle={{ height: "100vh", width: "100%" }}
                onLoad={() => console.log("Map loaded successfully")}
                onError={(e) => console.error("Map failed to load", e)}
            >
                {data?.map(sat => (
                    <SatMarker
                        key={sat?.OBJECT_NAME}
                        position={calculateLatLon(sat)}
                        data={sat}
                        click={click}
                        status={status}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default Map;
