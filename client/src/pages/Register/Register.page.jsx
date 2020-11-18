import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../../components/Input/Input';
import Button from './../../components/Button/Button';
import styles from './Register.module.css';
import ErrorNotice from '../../components/ErrorNotice/ErrorNotice';
import { userRegisterAction } from '../../redux/user/user.action';


const RegisterPage = () => {
    const [ displayName, setDisplayName ] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState();
    const [ error, setError ] = useState();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const newUser = { displayName, email, password, confirmPassword };
        try {
            dispatch(userRegisterAction(newUser));
        } catch(error) {
            setError(error.message);
        }
        // history.push("/"); 
    }

	return (
		<div className={styles.container}>
            <h1>Register</h1>
            {
                error && <ErrorNotice error={error} clearError={() => setError(undefined)} />
            }
            <form onSubmit={handleOnSubmit}>
                <Input 
                    label="display name"
                    name="displayName"
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <Input 
                    name="email" 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    required={true} 
                    autoComplete="email"
                />
                <Input 
                    name="password" 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    required={true} 
                    autoComplete="current-password"
                />
                <Input 
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={true}
                    autoComplete="new-password"
                />

				<div className={styles.buttonContainer}>
					<Button title="Register" type="submit" />
				</div>
			</form>
		</div>
	);
};

export default RegisterPage;
