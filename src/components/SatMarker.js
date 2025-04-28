import React from 'react';
import { Marker } from '@react-google-maps/api';

const SatMarker = ({ position, data, click, status }) => {
    const lat = position.latitude;
    const lng = position.longitude;
    const newData = {
        name: data.split("\n")[0],
        satlatitude: position.latitude,
        satlongitude: position.longitude,
        sataltitude: position.altitude,
        velocity: position.velocity,
    }
    return (
        <Marker
            position={{ lat, lng }}
            onClick={() => click(newData)}
            icon={{
                url: '/sat.png', // Replace with the path to your custom icon
                scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
            }}
        />
    );
};

export default SatMarker;