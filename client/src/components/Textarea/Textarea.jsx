import React from 'react';
import styles from './Textarea.module.css';

const Textarea = ({ label, name, type, autoComplete, onChange, required }) => {
    return ( 
        <div className={styles.inputGroup}>
            <label htmlFor={name}>
                {label ? label : name} 
                {required && <b> &#8727;</b>}
            </label>
            <textarea
                name={name}
                id={name}
                type={type}
                autoComplete={autoComplete}
                onChange={onChange} 
                required={required}
                rows="7"
            ></textarea>
        </div>
     );
}
 
export default Textarea;