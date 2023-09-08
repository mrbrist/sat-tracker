import { Icon } from '@iconify/react'
import satIcon from '@iconify/icons-mdi/satellite-variant'
import notFoundIcon from '@iconify/icons-mdi/question-mark'

const SatMarker = ({ lat, lng, click, status }) => {
    return (
        <div className='satMarker' onClick={() => { click() }}>
            {status === "notfound" ?
                (<Icon icon={notFoundIcon} className="satIcon notfound" />) : (
                    status === "dead" ? (<Icon icon={satIcon} className="satIcon dead" />) :
                        (<Icon icon={satIcon} className="satIcon alive" />)
                )}
        </div>
    )
}

export default SatMarker