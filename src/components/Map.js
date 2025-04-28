import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// import SatMarker from './SatMarker';

const Map = ({ data, click, status }) => {
    const defaultProps = {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 2.5
    };

    return (
        <div className="map">
            <LoadScript googleMapsApiKey="AIzaSyD_gaH-BnlRksIo_GJTmbQ-2uwn9i80S7o">
                <GoogleMap
                    center={defaultProps.center}
                    zoom={defaultProps.zoom}
                    mapContainerStyle={{ height: "100vh", width: "100%" }}
                >
                    <Marker
                            key="90"
                            position={{
                                lat: 50,
                                lng: 50
                            }}
                            // onClick={() => click(sat)}
                        />
                    {/* {data?.map(sat => (
                    // <SatMarker lat={sat?.positions[0].satlatitude} lng={sat?.positions[0].satlongitude} data={sat} click={click} status={status} />
                        <Marker
                            key={sat?.info.satname}
                            position={{
                                lat: 50,
                                lng: 50
                            }}
                            onClick={() => click(sat)}
                        />
                    ))} */}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;
