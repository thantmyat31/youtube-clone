import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { userLogout } from '../../redux/user/user.action';

import styles from './Header.module.css';
import { FaYoutube } from 'react-icons/fa';

const Header = ({ currentUser, userLogout }) => {
	const history = useHistory();

	const logout = () => {
		userLogout();
		localStorage.setItem('auth-token', '');
		history.push("/login");
    }
	return (
		<header className={styles.header}>
			<Link className={styles.logo} to="/">
				<FaYoutube className={styles.icon} /> MY Tube
			</Link>
			{!currentUser ? (
				<div className={styles.navLinks}>
					<Link className={styles.link} to="/login">
						Login
					</Link>
					<Link className={styles.link} to="/register">
						Register
					</Link>
				</div>
			) : (
				<div className={styles.navLinks}>
					<Link className={styles.link} to="/video/upload">Upload</Link>
					<p className={styles.link} onClick={logout}>Logout</p>
				</div>
			)}
		</header>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
