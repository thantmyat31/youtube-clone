import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import videoReducer from './video/video.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    video: videoReducer
});

export default rootReducer;