import React from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'

const TrackedData = props => {
    const sleepItem = props.data.find(
        item => `${item.id}` === props.match.params.id
    )

    if(!sleepItem) {
        return <Loader type="Rings" color="#00BFFF" height={100} width={100} /> 
    }
    
    console.log(sleepItem)
    return (
        <>
            <div key={sleepItem.id}>
                <p>{sleepItem.date}</p>
                <p>{sleepItem.feels}</p>
                <p>{sleepItem.notes}</p>
                <p>{sleepItem.timeFrom}</p>
                <p>{sleepItem.timeTo}</p>
                <button onClick={() => props.history.push(`/edit-tracker/${sleepItem.id}`)}>Edit</button>
                <button>Delete</button>
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
    {  }
)(TrackedData)

// {Date(props.item.date).slice(0, 24)}