import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'

import { fetchData } from '../actions'



const TrackerList = (props) => {


    return (
        <div>
            <p>
                {props.isFetching ? 
                <Loader
                    type="Rings"
                    color="#00BFFF"
                    height={100}
                    width={100}
                /> 
                : ''}
            </p>
            {props.data.map(item => (
                <div key={item.id}>
                    <p>{item.date}</p>
                    <p>{item.feels}</p>
                    <p>{item.notes}</p>
                    <p>{item.timeFrom}</p>
                    <p>{item.timeTo}</p>
                </div>
            ))}
        </div>
    )
}

const mapStatetoProps = state => {
    return {
        data: state.data,
        isFetching: state.isFetching,
        isPosting: state.isPosting,
        error: state.error
    }
}


export default connect(
    mapStatetoProps,
    { fetchData }
)(TrackerList)