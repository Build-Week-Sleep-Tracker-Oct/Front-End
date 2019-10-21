import { axiosWithAuth } from '../utils/axiosWithAuth';

export const START_FETCHING = 'START_FETCHING'
export const FETCH_SUCCESS = 'FETCH_SUCCES'
export const FETCH_FAILURE = 'FETCH_FAILURE'
export const fetchData = () => dispatch => {
    dispatch({ type: START_FETCHING })
        axiosWithAuth()
            .get(`/api/data`)
            .then(res => dispatch({ type: FETCH_SUCCESS, payload: res.data}))
            .catch(err => dispatch({ type: FETCH_FAILURE, payload: err}))
}

export const START_POSTING = 'START_POSTING'
export const POST_SUCCES = 'POST_SUCCES'
export const POST_FAILURE = 'POST_FAILURE'
export const postData = (item) => dispatch => {
    dispatch({ type: START_POSTING })
        axiosWithAuth()
            .post(`/api/data`, item)
            .then(res => 
                dispatch({ 
                    type: POST_SUCCES, payload: res.data
                }))
            .catch(err => 
                dispatch({ 
                    type: POST_FAILURE, payload: err
                }))
}