import React, { useState } from 'react';
import GoogleMap from 'google-maps-react-markers'

import SatMarker from './SatMarker';

const Map = ({ data, click, status }) => {
    const defaultProps = {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 2.5
    }

    const position = data?.positions[0]

    return (
        <div className="map">
            <GoogleMap
                apiKey='AIzaSyD_gaH-BnlRksIo_GJTmbQ-2uwn9i80S7o'
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {position ? (
                    <SatMarker lat={position.satlatitude} lng={position.satlongitude} click={click} status={status} />
                ) : (null)}
            </GoogleMap>
        </div>
    );
};

export default Map;
