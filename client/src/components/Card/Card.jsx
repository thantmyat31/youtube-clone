import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Card.module.css';
import moment from 'moment';

const Card = ({ item }) => {
    const history = useHistory();
    
    let minute = Math.floor(item.duration / 60);
	let second = Math.floor(item.duration - minute * 60);
	if (minute < 10) minute = `0${minute}`;
    if (second < 10) second = `0${second}`;
    
    const handleOnOpenVideo = () => {
        history.push(`/video/${item._id}`)
    }

	return (
        <div className="col-c4">
            <div className={styles.card} onClick={handleOnOpenVideo}>
                <div className={styles.image}>
                    <img src={`http://localhost:2020/${item.thumbnail}`} alt="thumbnail" />
                    <span>
                        {minute} : {second}
                    </span>
                </div>
                <div className={styles.info}>
                    <img
                        src={item.writer.image ? item.writer.image :`https://ui-avatars.com/api/?name=${item.writer.displayName}&size=40&background=random`}
                        alt="user profile"
                    />
                    <span className={styles.details}>
                        <h4>{item.title}</h4>
                        <p>{item.writer.displayName}</p>
                        <span>{item.views} {item.views > 0 ? "views" : "view"} <b>·</b> {moment(item.createdAt).format('MMM Do, YYYY')}</span>
                    </span>
                </div>
            </div>
        </div>
	);
};

export default Card;