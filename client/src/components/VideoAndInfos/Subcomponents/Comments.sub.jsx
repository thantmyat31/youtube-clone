import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeCommentAction } from '../../../redux/comment/comment.action';

import SingleComment from '../../SingleComment/SingleComment';
import CommentForm from '../../CommentForm/CommenForm';

import styles from './Comments.sub.module.css';
import ReplyComment from '../../ReplyComment/ReplyComment';

const Comments = ({ postId }) => {
	const [ content, setContent ] = useState("");
	const { currentUser } = useSelector((state) => state.user);
	const { comments } = useSelector((state) => state.comment);
	const dispatch = useDispatch();

	const handleOnSubmit = (event) => {
		event.preventDefault();
		const writer = currentUser.id;
		const data = { writer, postId, content };
		dispatch(makeCommentAction(data));
		setContent('');
	};

	const getContent = (value) => {
		setContent(value);
	}

	return (
		<div className={styles.container}>
			<h4>Comments</h4>
			<CommentForm 
				currentUser={currentUser && currentUser}
				getContent={getContent}
				content={content}
				onSubmit={handleOnSubmit}
			/>
			{comments && comments.map((comment, index) => (
				!comment.responseTo && <div key={index} className={styles.comments}>
					<SingleComment comment={comment} postId={postId} />
					<ReplyComment comments={comments} postId={postId} parentCommentId={comment._id} />
				</div>
			))}
		</div>
	);
};

export default Comments;
