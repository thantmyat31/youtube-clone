import { userActionTypes } from './user.type';
import { resetUserSibscriptionAction } from './../subscribe/subscribe.action';

import axios from 'axios';

const apiCall = axios.create({
    baseURL: 'http://localhost:2020/users'
})

export const saveUserInState = (token, user) => ({
    type: userActionTypes.SAVE_USER_IN_STATE,
    payload: { token, user }
});

export const initializeLogout = () => ({
    type: userActionTypes.USER_LOGOUT
});

export const channelVisitStart = () => ({
    type: userActionTypes.CHANNEL_VISIT_START
});

export const channelVisitSuccess = (channel) => ({
    type: userActionTypes.CHANNEL_VISIT_SUCCESS,
    payload: channel
});

export const channelVisitFailure = (error) => ({
    type: userActionTypes.CHANNEL_VISIT_FAILURE,
    payload: error
});

export const userLogout = () => {
    return (dispatch) => {
        dispatch(initializeLogout());
        dispatch(resetUserSibscriptionAction());
    }
};

export const channelVisitAction = (channelId) => {
    return async (dispatch) => {
        dispatch(channelVisitStart());
        try {
            
            const response = await apiCall.post('/channel', {channelId});
            const result = await response.data;
            if(result.success) {
                dispatch(channelVisitSuccess(result.channel));
            }
        } catch (error) {
            dispatch(channelVisitFailure(error));
        }
    }
}