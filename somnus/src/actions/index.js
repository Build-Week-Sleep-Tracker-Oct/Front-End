import { axiosWithAuth } from '../utils/axiosWithAuth';

export const START_FETCHING = 'START_FETCHING'
export const FETCH_SUCCESS = 'FETCH_SUCCES'
export const FETCH_FAILURE = 'FETCH_FAILURE'
export const fetchData = () => dispatch => {
    dispatch({ type: START_FETCHING })
        axiosWithAuth()
            .get(`/api/users/sleepdata`)
            .then(res => dispatch({ type: FETCH_SUCCESS, payload: res.data}))
            .catch(err => dispatch({ type: FETCH_FAILURE, payload: err}))
}

export const START_POSTING = 'START_POSTING'
export const POST_SUCCESS = 'POST_SUCCES'
export const POST_FAILURE = 'POST_FAILURE'
export const postData = (item) => dispatch => {
    dispatch({ type: START_POSTING })
        axiosWithAuth()
            .post(`/api/users/sleepdata`, item)
            .then(res => 
                dispatch({ 
                    type: POST_SUCCESS, payload: res.data
                }))
            .catch(err => 
                dispatch({ 
                    type: POST_FAILURE, payload: err
                }))
}

export const START_UPDATING = 'START_UPDATING'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'UPDATE_FAILURE'
export const updateData = item => dispatch => {
    dispatch({ type: START_UPDATING })
        axiosWithAuth()
            .put(`/api/users/sleepdata/${item.id}`, item)
            .then(res => (
                console.log(res.data),
                dispatch({ type: UPDATE_SUCCESS, payload: res.data
                })
            ))
            .catch(err => dispatch({ type: UPDATE_FAILURE, payload: err
            }))
}

export const START_DELETION = 'START_DELETION'
export const DELETION_SUCCESS = 'DELETION_SUCCESS'
export const DELETION_FAILURE = 'DELETION_FAILER'
export const deleteData = item => dispatch => {
    dispatch({ type: START_DELETION })
        axiosWithAuth()
            .delete(`/api/users/sleepdata/${item.id}`, item)
            .then(res => (
                console.log(res),
                dispatch({ type: DELETION_SUCCESS, payload: res.data
                })
            ))
            .catch(err => dispatch({ type: DELETION_FAILURE, payload: err
            }))
}