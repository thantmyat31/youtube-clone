const { commentActionTypes } = require("./comment.type")

const INITIAL_STATE = {
    comments: [],
    currentComment: null,
    error: null,
    loading: false
}

const commentReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case commentActionTypes.MAKE_COMMENT_START:
        case commentActionTypes.GET_COMMENTS_START:
            return {
                ...state,
                loading: true
            }
        
        case commentActionTypes.MAKE_COMMENT_FAILURE:
        case commentActionTypes.GET_COMMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case commentActionTypes.MAKE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                currentComment: action.payload
            }

        case commentActionTypes.GET_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: action.payload
            }

        default:
            return state;
    }
}

export default commentReducer;