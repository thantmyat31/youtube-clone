
import { subscribeActionTypes } from './subscribe.type';
const INITIAL_STATE = {
    subscribeNumber: null,
    isCurrentUserSubscribed: false,
    errors: [],
    loading: false,
}

const subscribeReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case subscribeActionTypes.GET_SUBSCRIBE_NUMBER_START:
        case subscribeActionTypes.CHECK_USER_SUBSCRIPTION_START:
            return {
                ...state,
                loading: true
            }

        case subscribeActionTypes.GET_SUBSCRIBE_NUMBER_FAILURE:
        case subscribeActionTypes.CHECK_USER_SUBSCRIPTION_FAILURE:
            return {
                ...state,
                loading: false,
                errors: [...state.error, action.payload]
            }
        
        case subscribeActionTypes.GET_SUBSCRIBE_NUMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: [],
                subscribeNumber: action.payload
            }

        case subscribeActionTypes.CHECK_USER_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: [],
                isCurrentUserSubscribed: action.payload
            }

        default:
            return state;
    }
}

export default subscribeReducer;