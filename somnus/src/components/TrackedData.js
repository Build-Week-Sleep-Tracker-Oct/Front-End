import React from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'

import { deleteData } from '../actions'

const TrackedData = props => {
    const sleepItem = props.data.find(
        item => `${item.id}` === props.match.params.id
    )

    if(!sleepItem) {
        return <Loader type="Rings" color="#00BFFF" height={100} width={100} /> 
    }
    
    return (
        <>
            <div className="entry" key={sleepItem.id}>
                <p>{sleepItem.dateTimeFrom}</p>
                <p>{sleepItem.dateTimeTo}</p>
                <p>{sleepItem.feels === '4' ? '😀' : ''}</p>
                <p>{sleepItem.feels === '3' ? '😐' : ''}</p>
                <p>{sleepItem.feels === '2' ? '😭' : ''}</p>
                <p>{sleepItem.feels === '1' ? '😡' : ''}</p>
                <p>{sleepItem.notes}</p>
                <button onClick={() => props.history.push(`/edit-tracker/${sleepItem.id}`)}>Edit</button>
                <button className="delete-button" onClick={() => {props.deleteData(sleepItem); props.history.push('/trackerlist')}}>Delete</button>
                
            </div>
        </>
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
    { deleteData }
)(TrackedData)
