import React, { useEffect, useState } from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getChannelVideoAction } from './../../redux/video/video.action';
import { getsubscribeNumberAction, subscriptionAction, checkUserSubscribeAction, unsubscribeAction } from '../../redux/subscribe/subscribe.action';

import UserAvatar from '../../components/UserAvatar/UserAvatar';
import Button from './../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import Input from './../../components/Input/Input';
import ChannelVideos from './components/ChannelVideos/ChannelVideos';
import ChannelAbout from './components/ChannelAbout/ChannelAbout';
import AlertBox from '../../components/AlertBox/AlertBox';

import { BsSearch } from 'react-icons/bs';
import styles from './Channel.module.css';

const ChannelPage = ({ match, history }) => {
    const channelId = match.params.channelId;
    const { channelVideos: videos } = useSelector(state => state.video);
    const { currentUser } = useSelector(state => state.user);
    const { subscribeNumber: number, isCurrentUserSubscribed: isSubscribed } = useSelector(state => state.subscribe);
    const [ channel, setChannel ] = useState();
    const [ filtered, setFiltered ] = useState([]);
    const [ keyword, setKeyword ] = useState('');
    const [ showAlert, setShowAlert ] = useState(false);
    const dispatch = useDispatch();
    const { url, path } = useRouteMatch();

    // get channel writer
    useEffect(() => {
        if(videos.length !== 0) {
            setChannel(videos[0].writer);
        }
    }, [videos, setChannel]);

    // get channel videos
    useEffect(() => {
        dispatch(getChannelVideoAction(channelId));
    },[dispatch, channelId]);

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
        if(!currentUser)  {
            return setShowAlert(true);
        }
        if(isSubscribed) dispatch(unsubscribeAction(channelId, currentUser.id));
        else dispatch(subscriptionAction(channelId, currentUser.id));
    }

    const handleOnSearch = (event) => {
        const query = event.currentTarget.value.trim();
        if(query !== '') {
            setKeyword(query);
        }
        if(videos.length !== 0) {
            setFiltered(videos.filter(v => v.title.toLowerCase().includes(query.toLowerCase())));
        }
    }

    if(!videos || videos.length === 0) return <Loading />;

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
                        <NavLink exact to={url} activeClassName={styles.current} className={styles.link}>Videos</NavLink>
                        <NavLink exact to={`${url}/about`} activeClassName={styles.current} className={styles.link}>About</NavLink>
                    </span>
                    <span className={styles.search}>
                        <Input label={<BsSearch />} type="text" name="search"
                            groupStyle={input.groupStyle}
                            labelStyle={input.labelStyle}
                            style={input.inputStyle}
                            borderTransparent={true}
                            onChange={handleOnSearch}
                        />
                    </span>
                </div>
            </div>
            <Switch>
                <Route exact path={path}>
                    <ChannelVideos videos={!keyword?videos:filtered} />
                </Route>
                <Route exact path={`${path}/about`}>
                    <ChannelAbout />
                </Route>
            </Switch>

            {showAlert && <AlertBox 
                title="Want to subscribe to this channel?"
                content="Sign in to subscribe to this channel."
                onCancel={() => setShowAlert(false)}
                onProceed={() => history.push('/login')}
            />}
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