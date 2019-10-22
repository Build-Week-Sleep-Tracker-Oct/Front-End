import React, {useState} from "react";
import { connect } from 'react-redux'
import { postData } from '../actions'
import styled from "styled-components";

const SleepForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 2%;
`;

const SleepFormLabel = styled.label`
    text-align: left;
`;

const DateInput = styled.input`
    margin: 2% 0;
`;

const TimeInput = styled.input`
    margin: 2% 0;
`;

const MoodInput = styled.select`
    margin: 2% 0;
    width: 60%;
`;

const NoteInput = styled.textarea`
    margin: 2% 0;
`;

const SubmitButton = styled.button`
    background: #FFBA08;
    border-radius: 5px;
    margin: 2% 0;
    padding: 2%;
    font-size: 18px;
`;

const SleepEntry = (props) => {
    const [entry, setEntry] = useState({
       dateTimeFrom: "",
       dateTimeTo: "",
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
    }

    return(
        <SleepForm onSubmit={submitEntry}>
            {/* <SleepFormLabel htmlFor="date">Date:</SleepFormLabel>
            <DateInput name="date" id="date" type="date" placeholder="Date(MM-DD-YYYY)" onChange={changeHandler} value={entry.date} /> */}
            
            <SleepFormLabel htmlFor="timeFrom">From:</SleepFormLabel>
            <TimeInput name="timeFrom" id="timeFrom" type="datetime-local" onChange={changeHandler} value={entry.dateTimeFrom} />

            <SleepFormLabel htmlFor="timeTo">To:</SleepFormLabel>
            <TimeInput name="timeTo" id="timeTo" type="datetime-local" onChange={changeHandler} value={entry.dateTimeTo} />

            <SleepFormLabel htmlFor="mood">Mood:</SleepFormLabel>
            <MoodInput name="mood" onChange={e => changeHandler(e)} value={entry.feels}>
                <option value="">Please choose how you feel</option>
                <option value="4">😀</option>
                <option value="3">😐</option>
                <option value="2">😭</option>
                <option value="1">😡</option>
            </MoodInput>
            
            <SleepFormLabel htmlFor="notes">notes:</SleepFormLabel>
            <NoteInput name="notes" id="notes" rows="10" cols="30" onChange={changeHandler} value={entry.notes} />
            <SubmitButton type="submit">Submit</SubmitButton>
        </SleepForm>
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