import React from 'react';
import { Marker } from '@react-google-maps/api';

const SatMarker = ({ lat, lng, data, click, status }) => {
    return (
        <Marker
            position={{ lat, lng }}
            onClick={() => click(data)}
            icon={{
                url: '/sat.png', // Replace with the path to your custom icon
                scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
            }}
        />
    );
};

export default SatMarker;