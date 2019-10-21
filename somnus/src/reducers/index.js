import { START_FETCHING, FETCH_SUCCESS, FETCH_FAILURE, START_POSTING, POST_SUCCES, POST_FAILURE } from '../actions';

const initialState = {
    data: [],
    isFetching: false,
    isPosting: false,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case START_FETCHING:
            return {
                ...state,
                isFetching: true,
                error: ''
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: '',
                data: action.payload
            }
        case FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer