import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../components/Input/Input';
import Button from './../../components/Button/Button';
import ErrorNotice from '../../components/ErrorNotice/ErrorNotice';
import styles from './Login.module.css';
import { useDispatch } from 'react-redux';
import { userLoginAction } from '../../redux/user/user.action';

const LoginPage = () => {
    const [ email, setEmail ] = useState();
	const [ password, setPassword ] = useState();
	const [ error, setError ] = useState();
	const history = useHistory();
	const dispatch = useDispatch();

    const handleOnSubmit = async (event) => {
        event.preventDefault();
		try {
			dispatch(userLoginAction(email, password));
		} catch (error) {
			setError(error.message);
		}
		history.goBack();
    }

	return (
		<div className={styles.container}>
			<h1>Login</h1>
			{
				error && <ErrorNotice error={error} clearError={() => setError(undefined)} />
			}
            <form onSubmit={handleOnSubmit}>
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

				<div className={styles.buttonContainer}>
					<Button title="Login" type="submit" />
				</div>
			</form>
		</div>
	);
};


export default LoginPage;
