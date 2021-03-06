import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { userLogout } from '../../redux/user/user.action';

import styles from './Header.module.css';
import { FaYoutube } from 'react-icons/fa';
import { RiVideoAddFill } from 'react-icons/ri';
import { BiMenuAltRight } from 'react-icons/bi';
import cx from 'classnames';
import UserAvatar from './../UserAvatar/UserAvatar';

const Header = ({ currentUser, userLogout }) => {
	const [ isMenuOpen, setIsMenuOpen ] = useState(false);
	const [ isDrop, setIsDrop ] = useState(false);
	const history = useHistory();

	const logout = () => {
		userLogout();
		localStorage.removeItem('auth-token');
		history.push('/login');
	};

	const handleOnMenuClose = (event) => {
		event.stopPropagation();
		setIsMenuOpen(!isMenuOpen);
	}

	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<Link className={styles.logo} to="/">
					<FaYoutube className={styles.logoIcon} /> MY Tube
				</Link>
				<div className={cx(styles.navLinks, styles.right)}>
					<Link className={styles.link} to="/">
						Home
					</Link>
					<Link className={styles.link} to="/subscription">
						Subscription
					</Link>
				</div>
			</div>
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
					<Link className={styles.link} to="/video/upload">
						<RiVideoAddFill className={styles.uploadIcon} />
					</Link>
					<span className={styles.userInfo} onClick={() => setIsDrop(!isDrop)}>
						<UserAvatar style={{ cursor:"pointer" }} user={currentUser} />
						{isDrop && <div className={styles.dropdown}>
							<Link className={styles.link} to="/user/dashboard">Dashboard</Link>
							<p className={styles.link} onClick={logout}>
								Logout
							</p>
						</div>}
					</span>
				</div>
			)}
			<div className={styles.menuContainer} onClick={handleOnMenuClose}>
				<BiMenuAltRight className={styles.menu} onClick={handleOnMenuClose} />
				<div className={isMenuOpen ? cx(styles.menuOverlay, styles.open) :styles.menuOverlay}>
					<Link className={styles.link} to="/">
						Home
					</Link>
					<Link className={styles.link} to="/subscription">
						Subscription
					</Link>
					{!currentUser ? (
						<div>
							<Link className={styles.link} to="/login">
								Login
							</Link>
							<Link className={styles.link} to="/register">
								Register
							</Link>
						</div>
					) : (
						<div>
							<Link className={styles.link} to="/video/upload">
								Upload
							</Link>
							<Link className={styles.link} to="/user/dashboard">
								Dashboard
							</Link>
							<p className={styles.link} onClick={logout}>
								Logout
							</p>
						</div>
					)}
					<span className={styles.close} onClick={handleOnMenuClose}>&times;</span>
				</div>
			</div>
		</header>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
	userLogout: () => dispatch(userLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
