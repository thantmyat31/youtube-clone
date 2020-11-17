import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserAvatar from '../../components/UserAvatar/UserAvatar';
import styles from './Channel.module.css';
import { channelVisitAction } from './../../redux/user/user.action';
import Button from './../../components/Button/Button';

const Channel = ({ match }) => {
    const channelId = match.params.channelId;
    const { channelVisitNow: channel } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        let isCleanUp = false;
        if(!isCleanUp) dispatch(channelVisitAction(channelId));
        return () => {
            isCleanUp = true;
        }
    },[dispatch, channelId]);

    console.log('[channel]',channel);
    return ( 
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.details}>
                    <UserAvatar style={{ width:"70px", height: "70px" }} user={channel} />
                    <span>
                        <h3>{channel.displayName}</h3>
                        <p>3 subscribers</p>
                    </span>
                </div>
                <div className={styles.button}>
                    <Button title="Subscribe" />
                </div>
            </div>
        </div>
     );
}
 
export default Channel;