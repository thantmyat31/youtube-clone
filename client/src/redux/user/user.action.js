import { userActionTypes } from './user.type';
import { resetUserSibscriptionAction } from './../subscribe/subscribe.action';

import axios from 'axios';

const apiCall = axios.create({
    baseURL: 'http://localhost:2020/users'
});

export const userLoginStart = () => ({
    type: userActionTypes.USER_LOGIN_START
});

export const userLoginSuccess = (token, user) => ({
    type: userActionTypes.USER_LOGIN_SUCCESS,
    payload: { token, user }
});

export const userLoginFailure = (error) => ({
    type: userActionTypes.USER_LOGIN_FAILURE,
    payload: error
}); 

export const userRegisterStart = () => ({
    type: userActionTypes.USER_REGISTER_START
});

export const userRegisterSuccess = (token, user) => ({
    type: userActionTypes.USER_REGISTER_SUCCESS,
    payload: { token, user }
});

export const userRegisterFailure = (error) => ({
    type: userActionTypes.USER_REGISTER_FAILURE,
    payload: error
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

export const userLoginAction = (email, password) => {
    return async (dispatch) => {
        dispatch(userLoginStart());
        try {
            const response = await apiCall.post(`/login`, {
                email,
                password
            });
            const result = await response.data;
            console.log(result);
            if(result) {
                const { token, user } = result ;
                dispatch(userLoginSuccess(token, user));
			}
        } catch (error) {
            dispatch(userLoginFailure(error));
        }
        
    }
}

export const userRegisterAction = (newUser) => {
    return async (dispatch) => {
        dispatch(userRegisterStart());
        try {
            
            // New user register
            const response = await apiCall.post(`/register`,newUser);
            const result = await response.data;
            
            console.log(result);
            if(result) {
                // dispatch(userLoginAction(result.email, result.password));
            }

        } catch (error) {
            dispatch(userRegisterFailure(error));
        }

    }
}

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