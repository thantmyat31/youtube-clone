import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSubscribedVideosAction } from '../../redux/video/video.action';

import VideoHOC from './../../components/HOC/VideoHOC';
import Card from './../../components/Card/Card';

import styles from './Subscription.module.css';

const SubscriptionPage = () => {
    const { videos, isLoading } = useSelector(state => state.video);
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const userFrom = currentUser && currentUser.id;
        dispatch(getSubscribedVideosAction(userFrom));
        
    }, [dispatch, currentUser]);

    const VideosRow = () => (
        <div className="row">
            {videos && videos.map((item, index) => <Card key={index} item={item} />)}
        </div>
    )

    // Add HOC For loading
    const WrapperComponent = VideoHOC(VideosRow);
  
    return ( 
        <div className="page">
            <h1 className={styles.title}>Subscribed Video</h1>
            <WrapperComponent isLoading={isLoading} />
        </div>
        );
    
}

export default SubscriptionPage;
