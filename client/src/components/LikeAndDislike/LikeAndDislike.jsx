import React from 'react';

import styles from './LikeAndDislike.module.css';
import { HiOutlineThumbUp, HiOutlineThumbDown } from 'react-icons/hi';

const LikeAndDislike = ({ video, videoId, userId, commentId }) => {
    let data = {};
    
    if(video) {
        data = { videoId, userId };
    } else {
        data = { commentId, userId };
    }

    const handleOnClick = () => {
        console.log(data);
    }
    
    return ( 
        <div className={styles.container}>
            <div className={styles.container}>
                <HiOutlineThumbUp className={styles.icon} onClick={handleOnClick} /> <b>0</b>
                <HiOutlineThumbDown className={styles.icon} onClick={handleOnClick} /> <b>0</b>    
            </div>
        </div>
     );
}
 
export default LikeAndDislike;