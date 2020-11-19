import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../Button/Button';
import UserAvatar from '../../UserAvatar/UserAvatar';
import LikeAndDislike from '../../LikeAndDislike/LikeAndDislike';
import moment from 'moment';
import styles from './Details.sub.module.css';

const Details = ({ video, subscribeNumber, subscribed, onClick }) => {
	const { currentUser } = useSelector(state => state.user);
	const [ isOwner, setIsOwner ] = useState(false);
	const history = useHistory();

	useEffect(() => {
		if(currentUser) {
			if(currentUser.id === video.writer._id) {
				setIsOwner(true);
			}
		}
	}, [currentUser, video, setIsOwner]);

	const handleOnGoChannel = (event) => {
        event.stopPropagation();
        history.push(`/channel/${video.writer._id}`);
    }

	return (
		<div className={styles.details}>
			<h3>{video.title}</h3>
			<div className={styles.videoInfo}>
				<span>
                    {video.views} {video.views > 0 ? 'views' : 'view'} <b>·</b> {" "}
				    {moment(video.createdAt).format('MMM Do, YYYY')}
                </span>
				
				<LikeAndDislike 
					userId={currentUser ? currentUser.id: null}
					videoId={video._id}
					video={true}
				/>
			</div>

			<div className={styles.infoAndSub}>
				<div className={styles.writerInfo}>
					<UserAvatar style={{ width: '50px', height: '50px' }} user={video.writer ? video.writer : null} />
					<span>
						<h4 onClick={handleOnGoChannel}>{video.writer.displayName}</h4>
						<p>
							{subscribeNumber} {subscribeNumber > 0 ? `subscribers` : `subscriber`}
						</p>
					</span>
				</div>
                <div>
                   {!isOwner && <Button
                        type="button"
                        title={subscribed ? 'Subscribed' : 'Subscribe'}
                        subscribed={subscribed}
                        onClick={onClick}
                    />}
				</div>
			</div>
		</div>
	);
};

export default Details;
