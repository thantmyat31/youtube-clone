import { videoActionTypes } from './video.type';

const INITIAL_STATE = {
    videos: [],
    error: null,
    loading: false,
    video: undefined,
    channelVideos: [],
    subscribedVideos: []
};

const videoReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case videoActionTypes.FETCH_VIDEOS_START:
        case videoActionTypes.GET_VIDEO_BY_ID_START:
        case videoActionTypes.GET_CHANNEL_VIDEO_START:
            return {
                ...state,
                loading: true
            }
        
        case videoActionTypes.FETCH_VIDEOS_FAILURE:
        case videoActionTypes.GET_VIDEO_BY_ID_FAILURE:
        case videoActionTypes.GET_CHANNEL_VIDEO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case videoActionTypes.FETCH_VIDEOS_SUCCESS:
            return {
                ...state,
                loading: false,
                videos: action.payload
            }

        case videoActionTypes.GET_VIDEO_BY_ID_SUCCCESS:
            return {
                ...state,
                loading: false,
                video: action.payload
            }

        case videoActionTypes.GET_SUBSCRIBED_VIDEOS_SUCCESS:
            return {
                ...state,
                loading: false,
                subscribedVideos: action.payload
            }

        case videoActionTypes.GET_CHANNEL_VIDEO_SUCCESS:
            return {
                ...state,
                loading: false,
                channelVideos: action.payload
            }


        default:
            return state;
    }
}

export default videoReducer;