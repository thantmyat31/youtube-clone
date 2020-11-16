import React, { useState } from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import Button from './../Button/Button';
import Input from './../Input/Input';

import styles from './CommentForm.module.css';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';

const CommentForm = ({ currentUser, getContent, onSubmit, content, onClose, isReply }) => {
	const [ isFocus, setIsFocus ] = useState(false);
	const history = useHistory();

    const handleOnClose = () => {
        setIsFocus(false);
        getContent("");
        if(onClose) onClose(false);
	}
	
	const handleOnFocus = () => {
		if(!currentUser) {
			return history.push('/login');
		}
		setIsFocus(true)
	}

	return (
		<div className={isFocus?cx(styles.formSection, styles.focus):styles.formSection}>
			{currentUser && <UserAvatar style={isReply&&{ width: '30px', height: '30px' }} user={currentUser} />}
			<form onSubmit={onSubmit}>
				<Input
                    onFocus={handleOnFocus}
					noLabel={true}
					name="comment"
					autoComplete="comment"
					onChange={(e) => getContent(e.currentTarget.value)}
					required
					placeholder="Add a public comment..."
					style={{ backgroundColor: '#F9F9F9', marginTop: 0 }}
					value={content}
				/>
				{isFocus && <div className={styles.buttonContainer}>
					<b onClick={handleOnClose}>Cancel</b>
					<Button type="submit" title={isReply?"Reply":"Comment"} comment={true} />
				</div>}
			</form>
		</div>
	);
};

export default CommentForm;
