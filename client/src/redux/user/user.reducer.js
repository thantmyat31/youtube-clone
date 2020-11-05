import { userActionTypes } from './user.type';
import { subscribeActionTypes } from '../subscribe/subscribe.type';

const INITIAL_STATE = {
    token: undefined,
    currentUser: undefined,
    channelsId: [],
    errors: [],
    loading: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userActionTypes.SAVE_USER_IN_STATE:
            return {
                ...state,
                currentUser: action.payload.user,
                token: action.payload.token
            }

        case userActionTypes.USER_LOGOUT:
            return {
                ...state,
                currentUser: undefined,
                token: undefined
            }

        case subscribeActionTypes.SUBSCRIBE_START:
            return {
                ...state,
                loading: true,
            }

        case subscribeActionTypes.SUBSCRIBE_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: [],
                channelsId: []
            }

        case subscribeActionTypes.SUBSCRIBE_FAILURE:
            return {
                ...state,
                loading: false,
                errors: [...state.errors, action.payload]
            }

        default:
            return state;
    }
}

export default userReducer;