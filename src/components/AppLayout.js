import React from 'react';

const AppLayout = ({ children }) => {
	return <div style={styles.container}>{children}</div>;
};

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'row'
	}
};

export default AppLayout;
