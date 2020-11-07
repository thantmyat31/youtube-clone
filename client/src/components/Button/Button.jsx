import React from 'react';
import styles from './Button.module.css';
import cx from 'classnames';

const Button = ({ title, type, subscribed, comment, onClick, style }) => {
    return ( 
        <button 
            type={type} 
            className={
                subscribed ? cx(styles.button, styles.subscribed) 
                :comment ? cx(styles.button, styles.comment)
                :styles.button
            }
            onClick={onClick}
            style={style}
        >{title}</button>
     );
}
 
export default Button;