import React from 'react';
import Loading from '../Loading/Loading';
import styles from './VideoAndInfos.module.css';
import moment from 'moment';
import Button from '../Button/Button';

const VideoAndInfos = ({ video, subscribeNumber, subscribed, onClick }) => {
    if(!video) return <Loading />;
    
    return ( 
        <div className={styles.container}>
            <video src={`http://localhost:2020/${video.filePath}`} autoPlay muted controls></video>
            <div>
                <h3>{video.title}</h3>
                <div className={styles.videoInfo}>
                    {video.views} {video.views > 0 ? 'views' : 'view'} <b>·</b> {moment(video.createdAt).format('MMM Do, YYYY')}
                </div>

                <div className={styles.infoAndSub}>
                    <div className={styles.writerInfo}>
                        <img src={video.writer.image ? `http://localhost:2020/${video.writer.image}` :`https://ui-avatars.com/api/?name=${video.writer.displayName}&size=40&background=random`} alt="User Avatar" />
                        <span>
                            <h4>{video.writer.displayName}</h4>
                            <p>{subscribeNumber} {subscribeNumber > 0 ? `subscribers`: `subscriber`}</p>
                        </span>
                    </div>
                    <div>
                        <Button 
                            type="button" 
                            title={subscribed ? "Subscribed" : "Subscribe"} 
                            style={subscribed ? 
                                    {background:"#ececec", borderColor:'#ececec',color:'#555'}: 
                                    null
                                } 
                            onClick={onClick} />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default VideoAndInfos;