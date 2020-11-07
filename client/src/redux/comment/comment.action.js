import { commentActionTypes } from './comment.type';
import axios from 'axios';

const apiCall = axios.create({
    baseURL: 'http://localhost:2020/comment'
});

// Make comment
export const makeCommentStart = () => ({
    type: commentActionTypes.MAKE_COMMENT_START
});

export const makeCommentSuccess = (comment) => ({
    type: commentActionTypes.MAKE_COMMENT_SUCCESS,
    payload: comment
});

export const makeCommentFailure = (error) => ({
    type: commentActionTypes.MAKE_COMMENT_FAILURE,
    payload: error
});

// Get comments
export const getCommentsStart = () => ({
    type: commentActionTypes.GET_COMMENTS_START
});

export const getCommentsSuccess = (comments) => ({
    type: commentActionTypes.GET_COMMENTS_SUCCESS,
    payload: comments
});

export const getCommentsFailure = (error) => ({
    type: commentActionTypes.GET_COMMENTS_FAILURE,
    payload: error
});

// Make comment
export const makeCommentAction = (data) => {
    return async (dispatch) => {
        dispatch(makeCommentStart());
        try {
            const response = await apiCall.post('/saveComment', data);
            const result = await  response.data;
            if(await result.success) {
                dispatch(makeCommentSuccess(result.comment));
                dispatch(getCommentsAction({postId: data.postId}));
            }
        } catch (error) {
            dispatch(makeCommentFailure(error));
        }
    }
}

// Get comments
export const getCommentsAction = (data) => {
    return async (dispatch) => {
        dispatch(getCommentsStart());
        try {
            const response = await apiCall.post('/getComments', data);
            const result = await response.data;
            if(await result.success) {
                dispatch(getCommentsSuccess(result.comments));
            }
        } catch (error) {
            dispatch(getCommentsFailure(error));
        }
    }
}