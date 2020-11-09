import { likeActionTypes } from './like.type';
import axios from 'axios';

const apiCall = axios.create({
    baseURL: 'http://localhost:2000/like'
})

// Get like
export const likeGetStart = () => ({
    type: likeActionTypes.GET_LIKE_START
});

export const likeGetSuccess = (likes) => ({
    type: likeActionTypes.GET_LIKE_SUCCESS,
    payload: likes
});

export const likeGetFailure = (error) => ({
    type: likeActionTypes.GET_LIKE_FAILURE,
    payload: error
});

export const likeGetAction = (data) => {
    return async (dispatch) => {
        dispatch(likeGetStart());
        try {
            const response = await apiCall.post('/getlikes', data);
            const result = await response.data;
            if(result.success) {
                dispatch(likeGetSuccess(result.likes));
            }
        } catch (error) {
            dispatch(likeGetFailure(error));
        }
    }
}

