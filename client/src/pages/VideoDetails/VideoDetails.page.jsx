import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoByIdAction } from '../../redux/video/video.action';

import VideoAndInfos from './../../components/VideoAndInfos/VideoAndInfos';
import SideCard from './../../components/SideCard/SideCard';
import VideoHOC from './../../components/HOC/VideoHOC';
import { checkUserSubscribeAction, getsubscribeNumberAction } from '../../redux/subscribe/subscribe.action';


const VideoDetailsPage = ({ match }) => {
    const videoId = match.params.videoId;
    const dispatch = useDispatch();
    const {video, loading, videos} = useSelector(state => state.video);
    const { subscribeNumber, isCurrentUserSubscribed } = useSelector(state => state.subscribe);
    const { currentUser } = useSelector(state => state.user);

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

    const WrapperComponent = VideoHOC(VideoAndInfos);
    
    return ( 
        <div className="page">
            <div className="grid">
                <WrapperComponent  
                    isLoading={loading} 
                    video={video} 
                    subscribeNumber={subscribeNumber} 
                    subscribed={isCurrentUserSubscribed}    
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