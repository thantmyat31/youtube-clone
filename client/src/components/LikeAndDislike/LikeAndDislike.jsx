import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AlertBox from '../AlertBox/AlertBox';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import styles from './LikeAndDislike.module.css';
import axios from 'axios';
import cx from 'classnames';

const apiCall = axios.create({
    baseURL: 'http://localhost:2020/like'
});

const LikeAndDislike = (props) => {
    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);
    
    const [ showAlert, setShowAlert ] = useState(false);
    const [ actionType, setActionType ] = useState('');

    const { currentUser } = useSelector(state => state.user);
    const history = useHistory();

    const variable = useMemo(() => {
        if (props.video) {
            return { videoId: props.videoId, userId: props.userId }
        } else {
            return { commentId: props.commentId, userId: props.userId }
        }
    }, [props.userId, props.videoId, props.commentId, props.video]);


    useEffect(() => {
        const source = axios.CancelToken.source();

        const getLike = async () => {
            try {
               
                const response = await apiCall.post(`/getlikes`, variable,{
                    cancelToken: source.token
                    });
                const result = await response.data;
                if(result.success) {
                    //How many likes does this video or comment have 
                    setLikes(result.likes.length);
    
                    //if I already click this like button or not 
                    if(props.userId) {
                        result.likes.forEach(like => {
                            if (like.userId === props.userId) {
                                setLikeAction('liked');
                            }
                        });
                    } 
                    
                }
            } catch(error) {
                if (axios.isCancel(error)) {
                    console.log('Api called is cancelled')
                } else {
                    console.log('Failed to get likes', error);
                }
            }
            
        }

        const getDislike = async () => {
            try {
                const response = await apiCall.post('/getdislikes', variable, {
                    cancelToken: source.token
                });
                const result = await response.data;
                if(result.success) {
                    //How many likes does this video or comment have
                    setDislikes(result.dislikes.length);

                    //if I already click this like button or not 
                    if(props.userId) {
                        result.dislikes.forEach(dislike => {
                            if (dislike.userId === props.userId) {
                                setDislikeAction('disliked')
                            }
                        });
                    }

                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Api called is cancelled')
                } else {
                    console.log('Failed to get dislikes', error);
                }
            }
        }

        getLike();
        getDislike();

        return () => {
            source.cancel();
        };
        
    }, [variable, props.userId]);

    const onLike = () => {
        if(!currentUser)  {
            setActionType('Like');
            return setShowAlert(true);
        }

        if (LikeAction === null) {
            apiCall.post(`/uplike`, variable)
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
            apiCall.post(`/unlike`, variable)
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
        if(!currentUser)  {
            setActionType("Don't like");
            return setShowAlert(true);
        }

        if (DislikeAction !== null) {
            apiCall.post(`/undisLike`, variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('Failed to decrease dislike')
                    }
                })
        } else {
            apiCall.post(`/updisLike`, variable)
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
            {showAlert && <AlertBox 
                title={`${actionType} this video?`}
                content="Sign in to make your opinion count."
                onCancel={() => setShowAlert(false)}
                onProceed={() => history.push('/login')}
            />}
        </div>
     );
     
}
 
export default LikeAndDislike;