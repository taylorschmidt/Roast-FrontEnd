import React from 'react'
import {Link} from 'react-router-dom';

const Cafe = (params) => {
    console.log(params.location.state.data)
    const cafeData = params.location.state.data
    return (
        <div>
            {cafeData.name}
        </div>
    )
}

export default Cafe