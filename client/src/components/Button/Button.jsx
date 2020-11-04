import React from 'react';
import styles from './Button.module.css';

const Button = ({ title, type, onClick, style }) => {
    return ( 
        <button 
            type={type} 
            className={styles.button}
            onClick={onClick}
            style={style}
        >{title}</button>
     );
}
 
export default Button;