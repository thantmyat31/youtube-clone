import React from 'react';
import TemplateItem from '../components/TemplateItem';

const HomePage = () => {
	return (
		<div style={styles.container}>
			<TemplateItem />
			<TemplateItem />
			<TemplateItem />
			<TemplateItem />
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 15,
		background: '#f6f6f6'
	}
};

export default HomePage;
