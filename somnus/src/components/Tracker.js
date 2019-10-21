import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'

import { fetchData, postData } from '../actions'
import { axiosWithAuth } from '../utils/axiosWithAuth';

import PastSleepData from './PastSleepData'

const Tracker = (props) => {
    useEffect(() => {
        props.fetchData()
    }, [props.isPosting])

    console.log(props.data)

    return (
        <div>
            <p>
                {props.isFetching ? <Loader
                    type="Rings"
                    color="#00BFFF"
                    height={100}
                    width={100}
                /> : ''}
            </p>

            {props.data.map(item => (
                <PastSleepData item={item} key={item.id} />
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
)(Tracker)