import { START_FETCHING, FETCH_SUCCESS, FETCH_FAILURE, START_POSTING, POST_SUCCESS, POST_FAILURE, START_UPDATING, UPDATE_SUCCESS, UPDATE_FAILURE, START_DELETION, DELETION_SUCCESS, DELETION_FAILURE } from '../actions';


const initialState = {
    data: [],
    isFetching: false,
    isPosting: false,
    isUpdating: false,
    isDeleting: false,
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
        case START_POSTING:
            return {
                ...state,
                isPosting: true,
                error: ''
            }
        case POST_SUCCESS:
            return {
                ...state,
                isPosting: false,
                error: '',
                data: state.data.map(item => (
                    [...item, action.payload]
                )) 
            }
        case POST_FAILURE:
            return {
                ...state,
                isPosting: false,
                error: action.payload
            }
        case START_UPDATING:
            return {
                ...state,
                isUpdating: true,
                error: ''
            }
        case UPDATE_SUCCESS:
            return {
                ...state,
                isUpdating: false,
                error: '',
                data: 
                // state.data.map(item => {
                //     action.payload.map(item2 => {
                //         if(item.id === item2.id) {
                //             return item = item2
                //         } else {
                //             return item
                //         }
                //     })
                //     return item
                // })

                state.data.map(item => {
                    if(item.id === action.payload.id) {
                        return item = action.payload
                    } else {
                        return item
                    }
                })
            }
        case UPDATE_FAILURE:
            return {
                ...state,
                isUpdating: false,
                error: action.payload
            }
        case START_DELETION:
            return {
                ...state,
                isDeleting: true,
                error: ''
            }
        case DELETION_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                error: '',
                data: action.payload.map(item => item)
            }
        case DELETION_FAILURE:
            return {
                ...state,
                isDeleting: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer