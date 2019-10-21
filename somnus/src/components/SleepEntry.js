import React, {useState} from "react";

const SleepEntry = () => {
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
        //addNewEntry
        setEntry({date: "", timeFrom: "", timeTo: "", feels: "", notes: ""});
    }

    return(
        <form onSubmit={submitEntry}>
            <label htmlFor="date">Date:</label>
            <input name="date" id="date" type="date" placeholder="Date(MM-DD-YYYY)" onChange={changeHandler} value={entry.date} />
            <label htmlFor="time">Time:</label>
            <input name="timeFrom" id="timeFrom" type="time" placeholder="From" onChange={changeHandler} value={entry.timeFrom} />
            <input name="timeTo" id="timeTo" type="time" placeholder="To" onChange={changeHandler} value={entry.timeTo} />
            <select name="feels" onChange={changeHandler} value={entry.feels}>
                <option>Please choose how you feel</option>
                <option value="😀">😀</option>
                <option value="😐">😐</option>
                <option value="😭">😭</option>
                <option value="😡">😡</option>
            </select>
            <label htmlFor="notes">notes:</label>
            <input name="notes" id="notes" type="text" onChange={changeHandler} value={entry.notes} />
        </form>
    );
}

export default SleepEntry;