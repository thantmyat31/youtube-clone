import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelVideoAction } from './../../redux/video/video.action';

import UserAvatar from '../../components/UserAvatar/UserAvatar';
import Button from './../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import Card from '../../components/Card/Card';

import styles from './Channel.module.css';
import { getsubscribeNumberAction, subscriptionAction } from '../../redux/subscribe/subscribe.action';
import { checkUserSubscribeAction, unsubscribeAction } from './../../redux/subscribe/subscribe.action';
import Input from './../../components/Input/Input';

import { BsSearch } from 'react-icons/bs';

const ChannelPage = ({ match }) => {
    const channelId = match.params.channelId;
    const { channelVideos: videos } = useSelector(state => state.video);
    const { currentUser } = useSelector(state => state.user);
    const { subscribeNumber: number, isCurrentUserSubscribed: isSubscribed } = useSelector(state => state.subscribe);
    const [ channel, setChannel ] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if(videos.length !== 0) {
            setChannel(videos[0].writer);
        }
    }, [videos, setChannel]);

    useEffect(() => {
        if(videos.length !== 0) {
            if(videos[0].writer._id !== channelId) {
                dispatch(getChannelVideoAction(channelId));
            }
        }
    },[dispatch, channelId, videos]);

    // Get numbers of subscribed user
    useEffect(() => {
        dispatch(getsubscribeNumberAction(channelId));
    }, [dispatch, channelId]);

    // Check current user is subscribed or not
    useEffect(() => {
        if(currentUser && channelId) dispatch(checkUserSubscribeAction(channelId, currentUser.id ));
    }, [dispatch, currentUser, channelId]);

    // Make subscription or unsubscription
    const subscription = () => {
        if(isSubscribed) dispatch(unsubscribeAction(channelId, currentUser.id));
        else dispatch(subscriptionAction(channelId, currentUser.id));
    }
    
    const cardRender = (videos) => {
        return videos.map(video => <Card key={video._id} inChannel={true} item={video} />);
    }

    if(!videos) return <Loading />;

    return ( 
        <div className={styles.container}>
            <div className={styles.channelHeader}>
                <div className={styles.info}>
                    <div className={styles.details}>
                        <UserAvatar style={{ width:"70px", height: "70px" }} user={channel} />
                        <span>
                            <h3>{channel?.displayName}</h3>
                            <p>{number} subscribers</p>
                        </span>
                    </div>
                    <div className={styles.button}>
                        <Button 
                            type="button"
                            title={isSubscribed ? 'Subscribed' : 'Subscribe'}
                            subscribed={isSubscribed}
                            onClick={subscription}
                        /> 
                    </div>
                </div>
                <div className={styles.topMenu}>
                    <span>
                        <b className={styles.current}>Videos</b>
                        <b>About</b>
                    </span>
                    <span className={styles.search}>
                        <Input label={<BsSearch />} type="text" name="search"
                            groupStyle={input.groupStyle}
                            labelStyle={input.labelStyle}
                            style={input.inputStyle}
                            borderTransparent={true}
                        />
                    </span>
                </div>
            </div>
            <div className={styles.videos}>
                <div className="row">
                    {cardRender(videos)}
                </div>
            </div>
        </div>
     );
}

const input = {
    groupStyle: {
        display: 'flex',
        flexDirection: 'row'
    },
    labelStyle: { 
        width:'auto',
        marginRight:"10px",
        fontSize:"1.2rem",
        position: "relative",
        top: "3px",
        color: "#555"
    },
    inputStyle: { 
        marginBottom:"10px"
    }
}
 
export default ChannelPage;