import { videoActionTypes } from './video.type';

import axios from 'axios';

export const fetchVideoStart = () => ({
    type: videoActionTypes.FETCH_VIDEO_START
});

export const fetchVideoSuccess = (videos) => ({
    type: videoActionTypes.FETCH_VIDEO_SUCCESS,
    payload: videos
});

export const fetchVideoFailure = (error) => ({
    type: videoActionTypes.FETCH_VIDEO_FAILURE,
    payload: error
});

export const getVideosAction = () => {
    return async (dispatch) => {
        dispatch(fetchVideoStart());
        try {
            const response = await axios.get('http://localhost:2020/video/getVideos');
            const result = await response.data;
            if(result) {
                dispatch(fetchVideoSuccess(result.videos));
            }
        } catch(error) {
            dispatch(fetchVideoFailure(error));
        }
    }
}