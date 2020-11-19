import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, noLabel, name, type, value, autoComplete, onChange, required, placeholder, style, groupStyle, labelStyle, onFocus, onBlur, borderTransparent }) => {
	return (
		<div className={styles.inputGroup} style={groupStyle}>
			{!noLabel && (
				<label htmlFor={name} style={labelStyle}>
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
				className={borderTransparent?styles.borderTransparent:null}
			/>
		</div>
	);
};

export default Input;
