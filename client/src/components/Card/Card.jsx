import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Card.module.css';
import moment from 'moment';
import UserAvatar from '../UserAvatar/UserAvatar';
import { increseViewCount } from './../../api/api';
import cx from 'classnames';

const Card = ({ item, inChannel }) => {
    const history = useHistory();
    
    let minute = Math.floor(item.duration / 60);
	let second = Math.floor(item.duration - minute * 60);
	if (minute < 10) minute = `0${minute}`;
    if (second < 10) second = `0${second}`;
    
    const handleOnOpenVideo = () => {
        history.push(`/video/${item._id}`);
        increseViewCount(item._id);
    }

    const handleOnGoChannel = (event) => {
        event.stopPropagation();
        history.push(`/channel/${item.writer._id}`);
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
                    {!inChannel && <UserAvatar user={item.writer} />}
                    <span className={inChannel ? cx(styles.details, styles.inChannel) : styles.details}>
                        <h5>{item.title}</h5>
                        {!inChannel && <p onClick={handleOnGoChannel}>{item.writer.displayName}</p>}
                        <span>{item.views} {item.views > 1 ? "views" : "view"} <b>·</b> {moment(item.createdAt).format('MMM Do, YYYY')}</span>
                    </span>
                </div>
            </div>
        </div>
	);
};

export default Card;
