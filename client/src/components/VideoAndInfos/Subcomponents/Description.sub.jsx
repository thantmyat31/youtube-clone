import React from 'react';
import styles from './Description.sub.module.css';

const Description = ({ desc }) => {
    return ( 
        <div className={styles.container}>
            <pre>
                {desc}
            </pre>
        </div>
     );
}
 
export default Description;