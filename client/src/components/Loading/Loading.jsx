import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
	return (
		<div className="page">
            <div className={styles.container}>
                <div className={styles.ldsRing}>
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
		</div>
	);
};

export default Loading;
