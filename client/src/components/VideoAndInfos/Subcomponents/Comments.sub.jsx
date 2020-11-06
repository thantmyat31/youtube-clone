import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Comments.sub.module.css';
import UserAvatar from '../../UserAvatar/UserAvatar';
import Input from './../../Input/Input';

const Comments = () => {
    const { currentUser } = useSelector(state => state.user);

    const handleOnChange = () => {
        
    }

    const handleOnSubmit = () => {

    }

    return (
        <div className={styles.container}>
            <h3>Comments</h3>
            <div className={styles.formSection}>
                <UserAvatar user={currentUser && currentUser} />
                <form onSubmit={handleOnSubmit}>
                    <Input 
                        onFocus={() => console.log('focus')}
                        noLabel={true}
                        name="comment"
                        autoComplete="comment"
                        onChange={handleOnChange}
                        required
                        placeholder="Add a public comment..."
                        style={{ backgroundColor: "#F9F9F9", marginTop:0 }}
                    />
                </form>
            </div>
        </div>
    )
}

export default Comments;
