import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'

import { fetchData } from '../actions'



const TrackerList = (props) => {

    const entryRoute = (e, item) => {
        e.preventDefault()
        props.history.push(`/trackerlist/${item.id}`)
    }

    if(!props.data) {
        return <Loader type="Rings" color="#00BFFF" height={100} width={100} /> 
    }

    
    // 😀
    // 😐
    // 😭
    // 😡

    // if(props.data.feels === 1){
    //     return <p>😡</p>
    // } else if(props.data.feels === 2) {
    //     return <p>😭</p>
    // }else if(props.data.feels === 3) {
    //     return <p>😐</p>
    // }else if(props.data.feels === 4) {
    //     return <p>😀</p>
    // }

    console.log(props.data)
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
            {props.data.map(item => {
                if(Number(item.feels) === 1){
                    return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                <p>😡</p>
                                <p>{item.notes}</p>
                                <p>{item.dateTimeFrom}</p>
                                <p>{item.dateTimeTo}</p>
                            </div>
                } else if(Number(item.feels) === 2) {
                    return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                <p>😭</p>
                                <p>{item.notes}</p>
                                <p>{item.dateTimeFrom}</p>
                                <p>{item.dateTimeTo}</p>
                            </div>
                } else if(Number(item.feels) === 3) {
                    return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                <p>😐</p>
                                <p>{item.notes}</p>
                                <p>{item.dateTimeFrom}</p>
                                <p>{item.dateTimeTo}</p>
                            </div>
                } else if(Number(item.feels) === 4) {
                    return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                <p>😀</p>
                                <p>{item.notes}</p>
                                <p>{item.dateTimeFrom}</p>
                                <p>{item.dateTimeTo}</p>
                            </div>
                } else {
                    return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                <p>{item.feels}</p>
                                <p>{item.notes}</p>
                                <p>{item.dateTimeFrom}</p>
                                <p>{item.dateTimeTo}</p>
                            </div>

                }
            })}
            <button className='addEntryButton' onClick={() => props.history.push('/sleepentry')}>Add Entry</button>
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