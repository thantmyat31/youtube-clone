import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, noLabel, name, type, value, autoComplete, onChange, required, placeholder, style, onFocus, onBlur }) => {
	return (
		<div className={styles.inputGroup}>
			{!noLabel && (
				<label htmlFor={name}>
					{label ? label : name}
					{required && <b> &#8727;</b>}
				</label>
			)}
			<input
                name={name}
                id={name}
                type={type}
                autoComplete={autoComplete}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                style={style}
                onFocus={onFocus}
				onBlur={onBlur}
				value={value}
			/>
		</div>
	);
};

export default Input;
