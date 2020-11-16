import React from 'react';
import Button from './../Button/Button';
import styles from './AlertBox.module.css';

const AlertBox = ({ title, content, onCancel, onProceed }) => {
    return ( 
        <div className={styles.container}>
            <div className={styles.alertBox}>
                <div className={styles.info}>
                    <h3>{title}</h3>
                    <p>{content}</p>
                </div>
                <div className={styles.buttons}>
                    <Button title="Cancel" onClick={onCancel} comment={true} style={{ marginRight: "10px" }} />
                    <Button title="Login" onClick={onProceed} />
                </div>
            </div>
        </div>
     );
}
 
export default AlertBox;