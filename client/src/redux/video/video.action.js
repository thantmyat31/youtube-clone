import { videoActionTypes } from './video.type';

import axios from 'axios';

const apiCall = axios.create({
    baseURL: "http://localhost:2020/video"
});

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
            const response = await apiCall.get('/getVideos');
            const result = await response.data;
            if(result) {
                dispatch(fetchVideosSuccess(result.videos));
            }
        } catch(error) {
            dispatch(fetchVideosFailure(error));
        }
    }
}

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