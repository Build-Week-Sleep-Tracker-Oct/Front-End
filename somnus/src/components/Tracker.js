import React, { useEffect } from 'react'
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Tracker = () => {
    useEffect(() => {
        axiosWithAuth()
            .get(`http://localhost:5000/api/data`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            Hello
        </>
    )
}

export default Tracker