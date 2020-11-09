import { likeActionTypes } from './like.type';

const INITIAL_STATE = {
    likes: [],
    error: null,
    loading: false
}

const likeReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case likeActionTypes.GET_LIKE_START:
            return {
                ...state,
                loading: true
            }

        case likeActionTypes.GET_LIKE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case likeActionTypes.GET_LIKE_SUCCESS:
            return {
                ...state,
                loading: false,
                like: action.payload
            }
    }
}

export default likeReducer;