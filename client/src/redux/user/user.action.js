import { userActionTypes } from './user.type';
import { resetUserSibscriptionAction } from './../subscribe/subscribe.action';

export const saveUserInState = (token, user) => ({
    type: userActionTypes.SAVE_USER_IN_STATE,
    payload: { token, user }
});

export const initializeLogout = () => ({
    type: userActionTypes.USER_LOGOUT
})

export const userLogout = () => {
    return (dispatch) => {
        dispatch(initializeLogout());
        dispatch(resetUserSibscriptionAction());
    }
};