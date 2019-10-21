import React, {useState} from "react";
import { connect } from 'react-redux'
import { postData } from '../actions'

const SleepEntry = (props) => {
    const [entry, setEntry] = useState({
       date: "",
       timeFrom: "",
       timeTo: "",
       feels: "",
       notes: "" 
    });

    const changeHandler = event => {
        setEntry({...entry, [event.target.name]: event.target.value});
    };
    
    const submitEntry = event => {
        event.preventDefault();
        props.postData(entry)
        props.history.push('/tracker')
        //addNewEntry
        // setEntry({date: "", timeFrom: "", timeTo: "", feels: "", notes: ""});
    }

    return(
        <form onSubmit={submitEntry}>
            <label htmlFor="date">Date:</label>
            <input name="date" id="date" type="date" placeholder="Date(MM-DD-YYYY)" onChange={changeHandler} value={entry.date} />
            
            <label htmlFor="timeFrom">From:</label>
            <input name="timeFrom" id="timeFrom" type="time" onChange={changeHandler} value={entry.timeFrom} />

            <label htmlFor="timeTo">To:</label>
            <input name="timeTo" id="timeTo" type="time" onChange={changeHandler} value={entry.timeTo} />

            <label htmlFor="feels">Feels:</label>
            <select name="feels" onChange={changeHandler} value={entry.feels}>
                <option>Please choose how you feel</option>
                <option value="😀">😀</option>
                <option value="😐">😐</option>
                <option value="😭">😭</option>
                <option value="😡">😡</option>
            </select>
            
            <label htmlFor="notes">notes:</label>
            <input name="notes" id="notes" type="text" onChange={changeHandler} value={entry.notes} />
            <button type="submit">Submit</button>
        </form>
    );
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
    { postData }
)(SleepEntry)