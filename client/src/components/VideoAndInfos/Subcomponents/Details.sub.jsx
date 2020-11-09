import React from 'react';
import Button from '../../Button/Button';

import styles from './Details.sub.module.css';
import moment from 'moment';
import UserAvatar from '../../UserAvatar/UserAvatar';
import LikeAndDislike from '../../LikeAndDislike/LikeAndDislike';
import { useSelector } from 'react-redux';

const Details = ({ video, subscribeNumber, subscribed, onClick }) => {
    const { currentUser } = useSelector(state => state.user);
	return (
		<div className={styles.details}>
			<h3>{video.title}</h3>
			<div className={styles.videoInfo}>
				<span>
                    {video.views} {video.views > 0 ? 'views' : 'view'} <b>·</b> {" "}
				    {moment(video.createdAt).format('MMM Do, YYYY')}
                </span>
                <LikeAndDislike video videoId={video._id} userId={currentUser.id} />
			</div>

			<div className={styles.infoAndSub}>
				<div className={styles.writerInfo}>
					<UserAvatar style={{ width: '50px', height: '50px' }} user={video.writer ? video.writer : null} />
					<span>
						<h4>{video.writer.displayName}</h4>
						<p>
							{subscribeNumber} {subscribeNumber > 0 ? `subscribers` : `subscriber`}
						</p>
					</span>
				</div>
                <div>
                    <Button
                        type="button"
                        title={subscribed ? 'Subscribed' : 'Subscribe'}
                        subscribed={subscribed}
                        onClick={onClick}
                    />
				</div>
			</div>
		</div>
	);
};

export default Details;
