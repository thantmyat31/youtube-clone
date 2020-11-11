import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoByIdAction } from '../../redux/video/video.action';
import { 
    checkUserSubscribeAction, 
    getsubscribeNumberAction, 
    subscriptionAction,
    unsubscribeAction
} from '../../redux/subscribe/subscribe.action';
import { getCommentsAction } from '../../redux/comment/comment.action';

import VideoAndInfos from './../../components/VideoAndInfos/VideoAndInfos';
import SideCard from './../../components/SideCard/SideCard';


const VideoDetailsPage = ({ match }) => {
    const videoId = match.params.videoId;
    const { currentUser } = useSelector(state => state.user);
    const {video, loading, videos} = useSelector(state => state.video);
    const { subscribeNumber, isCurrentUserSubscribed } = useSelector(state => state.subscribe);
    const dispatch = useDispatch();
    const videosList = videos && videos.filter(v => v._id !== videoId);

    // Get video by id
    useEffect(() => {
        let isCleanUp = false;
        if(!isCleanUp) dispatch(getVideoByIdAction(videoId));
        return () => {
            isCleanUp = true;
        }
    }, [dispatch, videoId]);

    // Get numbers of subscribed user
    useEffect(() => {
        let isCleanUp = false;
        if(video) {
            if(!isCleanUp) dispatch(getsubscribeNumberAction(video.writer._id));
        }
        return () => {
            isCleanUp = true;
        }
    }, [dispatch, video]);

    // Check current user is subscribed or not
    useEffect(() => {
        let isCleanUp = false;
        if(currentUser && video) {
            if(!isCleanUp) dispatch(checkUserSubscribeAction(video.writer._id, currentUser.id ));
        }
        return () => {
            isCleanUp = true;
        }
    }, [dispatch, currentUser, video]);

    // Get comments for current post
    useEffect(() => {
        let isCleanUp = false;
        const data = {
            postId: videoId
        };
        if(!isCleanUp) dispatch(getCommentsAction(data));
        return () => {
            isCleanUp = true;
        }
    }, [dispatch, videoId]);
    
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
                        videosList && videosList.map((video, index) => <SideCard key={index} video={video} />)   
                    }
                </div>
            </div>
        </div>
     );
}
 
export default VideoDetailsPage;