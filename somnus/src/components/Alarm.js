import React, { useState, useEffect } from 'react'
import moment from 'moment';
import UIfx from 'uifx'

import alarm from '../assets/alarm.wav'

const myAlarm = new UIfx (
    alarm, {
        volume: 0.5
    }
)

const Alarm = () => {
    const [alarm, setAlarm] = useState('')
    const [alarmSound, setAlarmSound] = useState()

    const changeHandler = e => {
        setAlarm(`${e.target.value}`)
    }

    const tick = () => {
        setAlarmSound(moment().format('MMMM DD YYYY h:mm:ss a'))
    }

    useEffect(() => {
        tick()
        return function cleanup() {
            tick()
        }
    }, [setInterval(() => {
        tick()
    }, 1000)])

    const alarmCall = () => {
        if(alarmSound === moment(alarm).format('MMMM DD YYYY h:mm:ss a')){
            myAlarm.play()
        }
    }
    

    console.log(alarmSound)
    console.log(moment(alarm).format('MMMM DD YYYY h:mm:ss a'))
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