import React from 'react';
import Card from '../../../../components/Card/Card';
import styles from './ChannelVideos.module.css';

const ChannelVideos = ({videos}) => {
    
    return ( 
        <div className={styles.videos}>
            <div className="row">
                {videos.map(video => <Card key={video._id} inChannel={true} item={video} />)}
            </div>
        </div>
     );
}
 
export default ChannelVideos;