import React from 'react';
import styles from './SideCard.module.css';
import moment from 'moment';

const SideCard = ({ video }) => {

    let minute = Math.floor(video.duration / 60);
    let second = Math.floor(video.duration - (minute * 60));
    minute = minute < 10 ? `0${minute}` : minute;
    second = second < 10 ? `0${second}` : second;
    return ( 
        <div className={styles.card}>
            <div className={styles.image}>
                <img src={`http://localhost:2020/${video.thumbnail}`} alt="thumbnail" />
                <span>{minute} : {second}</span>
            </div>
            <div className={styles.info}>
                <h5>{video.title}</h5>
                <p>{video.writer.displayName}</p>
                <span>
                    {video.views} {video.views > 0 ? 'views': 'view'} <b>·</b> {moment(video.createdAt).format('MMM Do, YYYY')}
                </span>
            </div>
        </div>
     );
}
 
export default SideCard;