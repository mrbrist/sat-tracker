import React from 'react';
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
    return (
        <div className="map">
            <GoogleMap
                apiKey='AIzaSyD_gaH-BnlRksIo_GJTmbQ-2uwn9i80S7o'
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {data?.map(sat => (
                    <SatMarker lat={sat?.positions[0].satlatitude} lng={sat?.positions[0].satlongitude} data={sat} click={click} status={status} />
                ))}
            </GoogleMap>
        </div>
    );
};

export default Map;
