import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import SatMarker from './SatMarker';

const Map = ({ data, click, status }) => {
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
                        key={sat?.info.satname}
                        lat={sat?.positions[0]?.satlatitude}
                        lng={sat?.positions[0]?.satlongitude}
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
