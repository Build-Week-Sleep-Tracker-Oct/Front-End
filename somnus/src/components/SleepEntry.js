import React, {useState} from "react";
import { connect } from 'react-redux'
import { postData } from '../actions'
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const SleepForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 2%;
`;

const SleepFormLabel = styled.label`
    text-align: left;
    color: white;
`;

const TimeInput = styled.input`
    margin: 4% 0;
    width: 50%;
`;

const MoodInput = styled.select`
    margin: 4% 0;
    width: 60%;
`;

const NoteInput = styled.textarea`
    margin: 4% 0;
`;

const SubmitButton = styled.button`
    background: #FFBA08;
    border-radius: 5px;
    margin: 10% 0;
    padding: 2%;
    font-size: 18px;
    border: none;
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
        props.history.push('/trackerlist')
        //addNewEntry        
    }

    return(
        <div className="sleep-entry">
            <h1>Somnus</h1>
        <SleepForm onSubmit={submitEntry}>

            <SleepFormLabel htmlFor="dateTimeFrom">From</SleepFormLabel>
            <TimeInput name="dateTimeFrom" id="dateTimeFrom" type="datetime-local" onChange={changeHandler} value={entry.dateTimeFrom} />

            <SleepFormLabel htmlFor="dateTimeTo">To</SleepFormLabel>
            <TimeInput name="dateTimeTo" id="dateTimeTo" type="datetime-local" onChange={changeHandler} value={entry.dateTimeTo} />

            <SleepFormLabel htmlFor="feels">Mood</SleepFormLabel>
            <MoodInput name="feels" onChange={e => changeHandler(e)} value={entry.feels}>
                <option selected disabled value="">Please choose how you feel</option>
                <option value="4">😀</option>
                <option value="3">😐</option>
                <option value="2">😭</option>
                <option value="1">😡</option>
            </MoodInput>
            
            <SleepFormLabel htmlFor="notes">notes</SleepFormLabel>
            <NoteInput name="notes" id="notes" rows="10" cols="30" onChange={changeHandler} value={entry.notes} />

            <SubmitButton type="submit">Submit</SubmitButton>
            
            <NavLink to={'/trackerlist'} style={{color:`white`, fontSize: `1.4rem`, textDecoration: `none`, textAlign: `left`}}>Back</NavLink>
        </SleepForm>
        </div>
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