import { videoActionTypes } from './video.type';

const INITIAL_STATE = {
    videos: [],
    error: null,
    loading: false
};

const videoReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case videoActionTypes.FETCH_VIDEO_START:
            return {
                ...state,
                loading: true
            }

        case videoActionTypes.FETCH_VIDEO_SUCCESS:
            return {
                ...state,
                loading: false,
                videos: action.payload
            }
        
        case videoActionTypes.FETCH_VIDEO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export default videoReducer;