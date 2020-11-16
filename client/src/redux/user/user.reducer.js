import { userActionTypes } from './user.type';
import { subscribeActionTypes } from '../subscribe/subscribe.type';

const INITIAL_STATE = {
    token: undefined,
    currentUser: undefined,
    channelsId: [],
    error: null,
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
        case subscribeActionTypes.UNSUBSCRIBE_START:
            return {
                ...state,
                loading: true,
            }

        case subscribeActionTypes.SUBSCRIBE_FAILURE:
        case subscribeActionTypes.UNSUBSCRIBE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case subscribeActionTypes.SUBSCRIBE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                channelsId: [...state.channelsId, action.payload]
            }

        case subscribeActionTypes.UNSUBSCRIBE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                channelsId: state.channelsId.filter(cid => cid !== action.payload)
            }

        default:
            return state;
    }
}

export default userReducer;