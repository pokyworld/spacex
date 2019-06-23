import React from 'react'

const MissionKey = () => {
    return (
        <div className="ml-5 mt-3 pb-1">
            <p><span className="px-3 mr-2 bg-danger" /> Failed</p>
            <p><span className="px-3 mr-2 bg-warning" /> Future Mission</p>
            <p><span className="px-3 mr-2 bg-success" /> Success</p>
        </div>
    )
}

export default MissionKey
