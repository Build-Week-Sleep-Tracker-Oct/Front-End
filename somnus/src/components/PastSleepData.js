import React from 'react'

const PastSleepData = props => {
    console.log(Date(props.item.date))
    return (
        <div>
            <p>{props.item.date}</p>
            <p>{props.item.feels}</p>
        </div>
    )
}

export default PastSleepData

// {Date(props.item.date).slice(0, 24)}