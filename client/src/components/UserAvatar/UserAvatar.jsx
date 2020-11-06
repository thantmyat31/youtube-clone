import React from 'react';
import { getUserImageUri } from './../../utils/services';
import styles from './UserAvatar.module.css';

const UserAvatar = ({ user, style }) => {
    return ( 
        <img style={style} className={styles.avatar} src={getUserImageUri(user)} alt="User Avatar" />
     );
}
 
export default UserAvatar;