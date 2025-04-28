import React from 'react'; // Added React import
import { Icon } from '@iconify/react'
import satIcon from '@iconify/icons-mdi/satellite-variant'

const SatMarker = ({ lat, lng, data, click, status }) => {
    return (
        <div className='satMarker' onClick={() => { click(data) }}>
            <span className="satName">{data.info.satname}</span>
            <Icon icon={satIcon} className="satIcon alive" />
        </div >
    )
}

export default SatMarker