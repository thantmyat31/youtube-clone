import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getVideosAction } from './../../redux/video/video.action';

import Card from '../../components/Card/Card';
import VideoHOC from './../../components/HOC/VideoHOC';

import styles from './LandingPage.module.css';


const LandingPage = ({ videos, isLoading, getVideosAction }) => {
    useEffect(() => {
        getVideosAction();
    }, [getVideosAction]);

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

const mapStateToProps = state => ({
    videos: state.video.videos,
    isLoading: state.video.loading
})

const mapDispatchToProps = dispatch => ({
    getVideosAction: () => dispatch(getVideosAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);