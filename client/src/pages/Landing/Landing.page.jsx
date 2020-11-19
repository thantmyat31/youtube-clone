import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVideosAction } from './../../redux/video/video.action';

import Card from '../../components/Card/Card';
import VideoHOC from './../../components/HOC/VideoHOC';

import styles from './Landing.module.css';


const LandingPage = () => {
    const { videos, isLoading } = useSelector(state => state.video);
    const dispatch = useDispatch();
    useEffect(() => {
        let isCleanUp = false;
        if(!isCleanUp) {
            if(!videos || videos.length === 0) {
                dispatch(getVideosAction());
            }
        }

        return () => {
            isCleanUp = true;
        }
    }, [dispatch, videos]);

    const VideosRow = () => (
        <div className="row">
            {videos && videos.map((item, index) => <Card key={index} item={item} />)}
        </div>
    )

    // Add HOC For loading
    const WrapperComponent = VideoHOC(VideosRow);

    return ( 
        <div className="page">
            <h1 className={styles.title}>Recommanded</h1>
            <WrapperComponent isLoading={isLoading} />
        </div>
     );
}


export default LandingPage;