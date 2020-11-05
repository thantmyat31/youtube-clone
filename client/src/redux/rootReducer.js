import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import videoReducer from './video/video.reducer';
import subscribeReducer from './subscribe/subscribe.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    video: videoReducer,
    subscribe: subscribeReducer
});

export default rootReducer;