import React, { useState, useEffect, useMemo } from 'react';

import { MdThumbUp, MdThumbDown } from 'react-icons/md';

import styles from './LikeAndDislike.module.css';
import cx from 'classnames';
import axios from 'axios';

const apiCall = axios.create({
    baseURL: 'http://localhost:2020/like'
})

const LikeAndDislike = (props) => {
    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);

    const variable = useMemo(() => {
        if (props.video) {
            return { videoId: props.videoId, userId: props.userId }
        } else {
            return { commentId: props.commentId, userId: props.userId }
        }
    }, [props.userId, props.videoId, props.commentId, props.video]);

    useEffect(() => {
        let isCleanUp = false;
        if(!isCleanUp) {

            apiCall.post('/getlikes', variable)
                .then(response => {
                    console.log('getlikes',response.data)

                    if (response.data.success) {
                        //How many likes does this video or comment have 
                        setLikes(response.data.likes.length)

                        //if I already click this like button or not 
                        response.data.likes.forEach(like => {
                            if (like.userId === props.userId) {
                                setLikeAction('liked')
                            }
                        })
                    } else {
                        alert('Failed to get likes')
                    }
                });
        }
            
        if(!isCleanUp) { 

            apiCall.post('/getdislikes', variable)
                .then(response => {
                    console.log('getdislike',response.data);

                    if (response.data.success) {
                        //How many likes does this video or comment have 
                        setDislikes(response.data.dislikes.length)

                        //if I already click this like button or not 
                        response.data.dislikes.forEach(dislike => {
                            if (dislike.userId === props.userId) {
                                setDislikeAction('disliked')
                            }
                        })
                    } else {
                        alert('Failed to get dislikes')
                    }
                });
        }

        return () => {
            isCleanUp = true;
        }

    }, [variable, props.userId])


    const onLike = () => {
        if (LikeAction === null) {
            apiCall.post('/uplike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        //If dislike button is already clicked
                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('Failed to increase the like')
                    }
                })
        } else {
            apiCall.post('/unlike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('Failed to decrease the like')
                    }
                })
        }
    }

    const onDisLike = () => {
        if (DislikeAction !== null) {
            apiCall.post('/undisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('Failed to decrease dislike')
                    }
                })
        } else {
            apiCall.post('/updisLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        //If dislike button is already clicked
                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else {
                        alert('Failed to increase dislike')
                    }
                })
        }
    }

    return ( 
        <div className={styles.container}>
            <div className={styles.container}>
                <MdThumbUp className={
                    LikeAction === 'liked'?cx(styles.icon, styles.like, styles.liked):
                    cx(styles.icon, styles.like)
                } onClick={onLike} /> 
                <b>{Likes > 0 && Likes}</b>

                <MdThumbDown className={
                    DislikeAction === 'disliked'?cx(styles.icon, styles.disliked):
                    styles.icon
                } onClick={onDisLike} /> 
                <b>{Dislikes > 0 && Dislikes}</b> 
            </div>
        </div>
     );
}
 
export default LikeAndDislike;