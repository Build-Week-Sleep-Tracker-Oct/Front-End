import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import { updateData } from '../actions'

const initialEntry = {
    dateTimeFrom: '',
    dateTimeTo: '',
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

    // const smiley = <span role="img" aria-labelledby='smiley'>😀</span>
    // const ok = <span role="img" aria-labelledby='ok'>😐</span>
    // const sad = <span role="img" aria-labelledby='sad'>😭</span>
    // const angry = <span role="img" aria-labelledby='angry'>😡</span>


    return (
        <div className="update-entry">
            <form onSubmit={handleSubmit}>
                <input 
                    name='dateTimeFrom'
                    placeholder='Time From'
                    type='text'
                    onChange={changeHandler}
                    value={entry.dateTimeFrom}
                />
                <input 
                    name='dateTimeTo'
                    placeholder='Time To'
                    type='text'
                    onChange={changeHandler}
                    value={entry.dateTimeTo}
                />
            
            {/* <input name="dateTimeFrom" id="dateTimeFrom" type="datetime-local" onChange={changeHandler} value={entry.dateTimeFrom} />
            <input name="dateTimeTo" id="dateTimeTo" placeholder='123' type="datetime-local" onChange={changeHandler} value={entry.dateTimeTo} /> */}
                <select name="feels" onChange={e => changeHandler(e)} value={entry.feels}>
                    <option selected disabled value="">Please choose how you feel</option>
                    <option value="4">😀</option>
                    <option value="3">😐</option>
                    <option value="2">😭</option>
                    <option value="1">😡</option>
                </select>
                <textarea name="notes" id="notes" rows="10" cols="30" onChange={changeHandler} value={entry.notes} />
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

