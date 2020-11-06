import { videoActionTypes } from './video.type';

import axios from 'axios';

const apiCall = axios.create({
    baseURL: "http://localhost:2020/video"
});

// Get all videos
export const fetchVideosStart = () => ({
    type: videoActionTypes.FETCH_VIDEOS_START
});

export const fetchVideosSuccess = (videos) => ({
    type: videoActionTypes.FETCH_VIDEOS_SUCCESS,
    payload: videos
});

export const fetchVideosFailure = (error) => ({
    type: videoActionTypes.FETCH_VIDEOS_FAILURE,
    payload: error
});

// Get video by video id
export const getVideoByIdStart = () => ({
    type: videoActionTypes.GET_VIDEO_BY_ID_SUCCCESS
});

export const getVideoByIdSuccess = (video) => ({
    type: videoActionTypes.GET_VIDEO_BY_ID_SUCCCESS,
    payload: video
});

export const getVideoByIdFailure = (error) => ({
    type: videoActionTypes.GET_VIDEO_BY_ID_FAILURE,
    payload: error
})


// Get all videos from mongodb
export const getVideosAction = () => {
    return async (dispatch) => {
        dispatch(fetchVideosStart());
        try {
            let response = await apiCall.get('/getVideos');
            const result = await response.data;
            if(result) {
                dispatch(fetchVideosSuccess(result.videos));
            }
        } catch(error) {
            dispatch(fetchVideosFailure(error));
        }
    }
}

// Get subscribed videos
export const getSubscribedVideosAction = (userFrom) => {
    return async (dispatch) => {
        dispatch(fetchVideosStart());
        try {
            let response = await apiCall.post('/getSubscriptionVideos', { userFrom: userFrom });
            const result = await response.data;
            if(result) {
                dispatch(fetchVideosSuccess(result.videos));
            }
        } catch(error) {
            dispatch(fetchVideosFailure(error));
        }
    }
}

// Get video by video id
export const getVideoByIdAction = (videoId) => {
    return async (dispatch) => {
        dispatch(getVideoByIdStart());
        try {
            const response = await apiCall.post('/getVideo', {videoId});
            const result = await response.data;
            if(result) {
                dispatch(getVideoByIdSuccess(result.video));
            }
        } catch (error) {
            dispatch(getVideoByIdFailure(error));
        }
    }
}