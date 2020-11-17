import { userActionTypes } from './user.type';
import { subscribeActionTypes } from '../subscribe/subscribe.type';

const INITIAL_STATE = {
    token: undefined,
    currentUser: undefined,
    channelsId: [],
    error: null,
    loading: false,
    channelVisitNow: undefined
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

        case userActionTypes.CHANNEL_VISIT_START:
        case subscribeActionTypes.SUBSCRIBE_START:
        case subscribeActionTypes.UNSUBSCRIBE_START:
            return {
                ...state,
                loading: true,
            }

        case userActionTypes.CHANNEL_VISIT_FAILURE:
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

        case userActionTypes.CHANNEL_VISIT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                channelVisitNow: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;