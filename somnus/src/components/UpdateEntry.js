import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'

import { axiosWithAuth } from '../utils/axiosWithAuth'
import { updateData } from '../actions'

const initialEntry = {
    date: '',
    timeFrom: '',
    timeTo: '',
    feels: '',
    notes: ''
}
const UpdateEntry = props => {
    const [entry, setEntry] = useState(initialEntry)

    const entryToEdit = props.data.find(item => item.id === Number(props.match.params.id))
    
    

    useEffect(() => {
        if(entryToEdit) {
            setEntry(entryToEdit)
        }
        
    }, [entryToEdit])
    
    if(!entryToEdit) {
        return <Loader type="Rings" color="#00BFFF" height={100} width={100} /> 
    }
    

    


    const changeHandler = e => {
        e.preventDefault()
        setEntry({
            ...entry,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateData(entry)
        props.history.push('/trackerlist')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    name='date'
                    placeholder='Date'
                    type='text'
                    onChange={changeHandler}
                    value={entry.date}
                />
                <input 
                    name='timeFrom'
                    placeholder='Time From'
                    type='text'
                    onChange={changeHandler}
                    value={entry.timeFrom}
                />
                <input 
                    name='timeTo'
                    placeholder='Time To'
                    type='text'
                    onChange={changeHandler}
                    value={entry.timeTo}
                />
                <input 
                    name='feels'
                    placeholder='Feels'
                    type='text'
                    onChange={changeHandler}
                    value={entry.feels}
                />
                <input 
                    name='notes'
                    placeholder='Notes'
                    type='text'
                    onChange={changeHandler}
                    value={entry.notes}
                />
                <button>Update</button>
            </form>
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
    { updateData }
)(UpdateEntry)

