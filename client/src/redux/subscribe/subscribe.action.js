import { subscribeActionTypes } from './subscribe.type';
import axios from 'axios';

const apiCall = axios.create({
    baseURL: 'http://localhost:2020/subscribe'
});

// Make subscription
export const subscriptionStart = () => ({
    type: subscribeActionTypes.SUBSCRIBE_START
});

export const subscriptionSuccess = (channelId) => ({
    type: subscribeActionTypes.SUBSCRIBE_SUCCESS,
    payload: channelId
});

export const subscriptionFailure = (error) => ({
    type: subscribeActionTypes.SUBSCRIBE_FAILURE,
    payload: error
});

// Unsubscribe
export const unsubscribeStart = () => ({
    type: subscribeActionTypes.UNSUBSCRIBE_START
});

export const unsubscribeSuccess = (channelId) => ({
    type: subscribeActionTypes.UNSUBSCRIBE_SUCCESS,
    payload: channelId
});

export const unsubscribeFailure = (error) => ({
    type: subscribeActionTypes.UNSUBSCRIBE_FAILURE,
    payload: error
});

// Get subscribe number
export const getSubscribeNumberStart = () => ({
    type: subscribeActionTypes.GET_SUBSCRIBE_NUMBER_START
});

export const getSubscribeNumberSuccess = (subscribeNumber) => ({
    type: subscribeActionTypes.GET_SUBSCRIBE_NUMBER_SUCCESS,
    payload: subscribeNumber
});

export const getSubscribeNumberFailure = (error) => ({
    type: subscribeActionTypes.GET_SUBSCRIBE_NUMBER_FAILURE,
    payload: error
});

// Check current user subscription
export const checkUserStart = () => ({
    type: subscribeActionTypes.CHECK_USER_SUBSCRIPTION_START,
});

export const checkUserSuccess = (result) => ({
    type: subscribeActionTypes.CHECK_USER_SUBSCRIPTION_SUCCESS,
    payload: result
});

export const checkUserFailure = (error) => ({
    type: subscribeActionTypes.CHECK_USER_SUBSCRIPTION_FAILURE,
    payload: error
});

// Make subscription
export const subscriptionAction = (userTo, userFrom) => {
    return async (dispatch) => {
        dispatch(subscriptionStart());
        try {
            const response = await apiCall.post('/subscription', {userTo: userTo, userFrom: userFrom});
            const result = await response.data;
            if(await result.success) {
                dispatch(subscriptionSuccess(result.channelId));
                dispatch(getsubscribeNumberAction(userTo));
                dispatch(checkUserSubscribeAction(userTo, userFrom));
            }
        } catch (error) {
            dispatch(subscriptionFailure(error));
        }
    }
}

// Unscribe
export const unsubscribeAction = (userTo, userFrom) => {
    return async (dispatch) => {
        dispatch(unsubscribeStart());
        try {
            const response = await apiCall.post('/unsubscribe', { userTo: userTo, userFrom: userFrom });
            const result = await response.data;
            if(result.success) {
                dispatch(unsubscribeSuccess(result.channelId));
                dispatch(getsubscribeNumberAction(userTo));
                dispatch(checkUserSubscribeAction(userTo, userFrom));
            }
        } catch (error) {
            dispatch(unsubscribeFailure(error));
        }
    }
}

// Get subscribe Number
export const getsubscribeNumberAction = (userTo) => {
    return async (dispatch) => {
        dispatch(getSubscribeNumberStart());
        try {
            const response = await apiCall.post('/subscribeNumber', {userTo: userTo});
            const result = await response.data;
            dispatch(getSubscribeNumberSuccess(result.subscribeNumber));
        } catch (error) {
            dispatch(getSubscribeNumberFailure(error));
        }
    }
};

// Check current user subscription
export const checkUserSubscribeAction = (userTo, userFrom) => {
    return async (dispatch) => {
        dispatch(checkUserStart());
        try {
            const response = await apiCall.post('/subscribed', {userTo: userTo, userFrom: userFrom});
            const result = await response.data;
            dispatch(checkUserSuccess(result.subscribed));
        } catch (error) {
            dispatch(checkUserFailure(error));
        }
    }
}