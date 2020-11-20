import React from 'react';
import styles from './ChannelAbout.module.css';

const ChannelAbout = () => {
    return ( 
        <div className={styles.about}>
            <div className={styles.description}>
                <h3>Description</h3>
                <p>This will show about me.</p>
            </div>
        </div>
    );
}
 
export default ChannelAbout;