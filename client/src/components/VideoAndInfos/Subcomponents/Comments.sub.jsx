import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeCommentAction } from '../../../redux/comment/comment.action';

import UserAvatar from '../../UserAvatar/UserAvatar';
import Input from './../../Input/Input';
import Button from './../../Button/Button';
import styles from './Comments.sub.module.css';
import SingleComment from '../../SingleComment/SingleComment';
import cx from 'classnames';

const Comments = ({ postId }) => {
	const [ isFocus, setIsFocus ] = useState(false);
	const [ content, setContent ] = useState();
	const { currentUser } = useSelector((state) => state.user);
	const { comments } = useSelector((state) => state.comment);
	const dispatch = useDispatch();

	const handleOnChange = (event) => {
		const value = event.target.value.trim();
		if (value !== '') {
			setContent(value);
		}
	};

	const handleOnSubmit = (event) => {
		event.preventDefault();
		const writer = currentUser.id;
		const data = { writer, postId, content };
		dispatch(makeCommentAction(data));
		setContent('');
	};

	return (
		<div className={styles.container}>
			<h4>Comments</h4>
			<div className={isFocus?cx(styles.formSection, styles.focus):styles.formSection}>
				<UserAvatar user={currentUser && currentUser} />
				<form onSubmit={handleOnSubmit}>
					<Input
						onFocus={() => setIsFocus(true)}
						noLabel={true}
						name="comment"
						autoComplete="comment"
						onChange={handleOnChange}
						required
						placeholder="Add a public comment..."
						style={{ backgroundColor: '#F9F9F9', marginTop: 0 }}
					/>
					{isFocus && (
						<div className={styles.buttonContainer}>
							<b onClick={() => setIsFocus(false)}>Cancel</b>
							<Button type="submit" title="Comment" comment={true} />
						</div>
					)}
				</form>
			</div>
			{comments && comments.map((comment, index) => (
				!comment.responseTo && <SingleComment key={index} comment={comment} />
			))}
		</div>
	);
};

export default Comments;
