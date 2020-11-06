import React from 'react';
import Loading from '../Loading/Loading';
import styles from './VideoAndInfos.module.css';

import Details from './Subcomponents/Details.sub';
import Comments from './Subcomponents/Comments.sub';
import Description from './Subcomponents/Description.sub';

const VideoAndInfos = ({ video, subscribeNumber, subscribed, onClick }) => {
    if(!video) return <Loading />;
    
    return ( 
        <div className={styles.container}>
            <video src={`http://localhost:2020/${video.filePath}`} autoPlay muted controls></video>
            <Details 
                video={video} 
                subscribeNumber={subscribeNumber} 
                subscribed={subscribed} 
                onClick={onClick} 
            />
            <Description desc={video.description} />
            <Comments />
        </div>
     );
}
 
export default VideoAndInfos;