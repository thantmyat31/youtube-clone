import React from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './SingleComment.module.css';

const SingleComment = ({ comment }) => {
	return (
		<div className={styles.container}>
			<UserAvatar user={comment.writer} />
			<div className={styles.comment}>
				<h5>{comment.writer.displayName}</h5>
				<p>{comment.content}</p>
			</div>
		</div>
	);
};

export default SingleComment;
