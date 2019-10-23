import React, { useState, useEffect } from 'react'
import moment from 'moment';
import UIfx from 'uifx'
import { useAsync } from 'react-async'

import alarm from '../assets/alarm.wav'

const myAlarm = new UIfx (
    alarm, {
        volume: 0.5
    }
)

const Alarm = () => {
    const [alarm, setAlarm] = useState('')
    const [alarmSound, setAlarmSound] = useState()
    const [intervalState, setIntervalState] = useState()

    const changeHandler = e => {
        setAlarm(`${e.target.value}`)
    }

    const tick = () => {
        
    }


    useEffect(() => {
        // tick()
        
        const interval = setInterval(() => {
            setAlarmSound(moment().format('MMMM DD YYYY h:mm:ss a'))
        }, 1000)
        return function(){
            clearInterval(interval)
        }
        
    }, [alarmSound])

    const alarmCall = () => {
        if(alarmSound === moment(alarm).format('MMMM DD YYYY h:mm:ss a')){
            myAlarm.play()
        }
    }
    

    // console.log(alarmSound)
    // console.log(moment(alarm).format('MMMM DD YYYY h:mm:ss a'))
    return (
        <div>
            <p>Alarm</p>
            <input name="alarm" id="alarm" type="datetime-local" 
            onChange={changeHandler} />

            <p>
                {!alarm ? 'Alarm is not set' : 
                <>Alarm is set for {moment(alarm).format('MM/DD/YYYY HH:MM a')}</>
                }
                
            </p>
            {alarmCall()}
        </div>
        
    )
}

export default Alarm