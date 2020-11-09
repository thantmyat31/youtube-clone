import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import videoReducer from './video/video.reducer';
import subscribeReducer from './subscribe/subscribe.reducer';
import commentReducer from './comment/comment.reducer';
import likeReducer from './like/like.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    video: videoReducer,
    subscribe: subscribeReducer,
    comment: commentReducer,
    like: likeReducer
});

export default rootReducer;