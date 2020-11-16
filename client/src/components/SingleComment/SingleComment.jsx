import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeCommentAction } from '../../redux/comment/comment.action';

import UserAvatar from '../UserAvatar/UserAvatar';
import CommentForm from '../CommentForm/CommenForm';

import styles from './SingleComment.module.css';
import LikeAndDislike from '../LikeAndDislike/LikeAndDislike';

const SingleComment = ({ comment, postId }) => {
	const [ content, setContent ] = useState("");
	const [ isCommentBoxOpen, setIsCommentBoxOpen ] = useState(false);
	const { currentUser } = useSelector(state => state.user);
	const dispatch = useDispatch();


	const getContent = (value) => {
		setContent(value);
	}

	const handleOnSubmit = (event) => {
		event.preventDefault();
		const writer = currentUser.id;
		const data = {
			writer,
			postId,
			responseTo: comment._id,
			content
		}
		dispatch(makeCommentAction(data));
		setContent('');
		onClose(false);
	}

	const handleOnCommentBoxOpen = () => {
		setIsCommentBoxOpen(!isCommentBoxOpen);
		setContent("");
	}

	const onClose = (onClose) => {
		setIsCommentBoxOpen(onClose);
	}

	return (
		<>
			<div className={styles.container}>
				<UserAvatar user={comment.writer} />
				<div className={styles.comment}>
					<h5>{comment.writer.displayName}</h5>
					<p>{comment.content}</p>
					<div className={styles.reply}>
						<LikeAndDislike 
							video={false}
							commentId={comment._id} 
							userId={currentUser ? currentUser.id : null} 
						/>
						<b className={styles.button} onClick={handleOnCommentBoxOpen}>Reply</b>
					</div>
					{isCommentBoxOpen && <CommentForm 
						currentUser={currentUser && currentUser}
						getContent={getContent}
						content={content}
						onSubmit={handleOnSubmit}
						onClose={onClose}
						isReply={true}
					/>}
				</div>
			</div>
		</>
	);
};

export default SingleComment;
