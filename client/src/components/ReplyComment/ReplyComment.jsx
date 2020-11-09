import React, { useState } from 'react';
import SingleComment from '../SingleComment/SingleComment';

import styles from './ReplyComment.module.css';

const ReplyComment = ({ comments, postId, parentCommentId }) => {
    const [ isShow, setIsShow ] = useState(false);
    const commentsList = comments && comments.filter(comment => comment.responseTo === parentCommentId);
    
    return ( 
        <div className={styles.container}>
            {
                commentsList.length > 0 &&
                <p className={styles.viewmore} onClick={() => setIsShow(!isShow)}>{isShow?"Hide":"View"} {commentsList.length} {commentsList.length > 1 ? "replies" : "reply"}</p>
            }
            {isShow && comments && commentsList.map((comment, index) => (
				<div key={index} className={styles.comments}>
					<SingleComment comment={comment} postId={postId} />
					<ReplyComment comments={comments} postId={postId} parentCommentId={comment._id} />
				</div>
			))}
        </div>
     );
}
 
export default ReplyComment;