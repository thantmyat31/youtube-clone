import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoByIdAction } from '../../redux/video/video.action';
import { 
    checkUserSubscribeAction, 
    getsubscribeNumberAction, 
    subscriptionAction,
    unsubscribeAction
} from '../../redux/subscribe/subscribe.action';

import VideoAndInfos from './../../components/VideoAndInfos/VideoAndInfos';
import SideCard from './../../components/SideCard/SideCard';


const VideoDetailsPage = ({ match }) => {
    const videoId = match.params.videoId;
    const {video, loading, videos} = useSelector(state => state.video);
    const { subscribeNumber, isCurrentUserSubscribed } = useSelector(state => state.subscribe);
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideoByIdAction(videoId));
    }, [dispatch, videoId]);

    useEffect(() => {
        if(video) {
            dispatch(getsubscribeNumberAction(video.writer._id));
        }
    }, [dispatch, video]);

    useEffect(() => {
        if(currentUser && video) {
            dispatch(checkUserSubscribeAction(video.writer._id, currentUser.id ));
        }
    }, [dispatch, currentUser, video]);
    
    const subscription = () => {
        if(isCurrentUserSubscribed) dispatch(unsubscribeAction(video.writer._id, currentUser.id));
        else dispatch(subscriptionAction(video.writer._id, currentUser.id));
    }
    
    return ( 
        <div className="page">
            <div className="grid">
                <VideoAndInfos  
                    isLoading={loading} 
                    video={video} 
                    subscribeNumber={subscribeNumber} 
                    subscribed={isCurrentUserSubscribed}
                    onClick={subscription} 
                />
                <div className="col-c3 card-row-container">
                    {
                        videos && videos.map((video, index) => <SideCard key={index} video={video} />)   
                    }
                </div>
            </div>
        </div>
     );
}
 
export default VideoDetailsPage;