import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const TemplateItem = ({ uri }) => {
	const [ isMouseOver, setIsMouseOver ] = useState(false);

	return (
		<Link to="/template">
			<div
				style={isMouseOver ? { ...styles.item, boxShadow: '0 0 5px 2px #d6d6d6' } : styles.item}
				onMouseOver={() => setIsMouseOver(true)}
				onMouseOut={() => setIsMouseOver(false)}
			>
				<img style={styles.image} src={uri} alt="template" />
			</div>
		</Link>
	);
};

const styles = {
	item: {
		width: 200,
		height: 300,
		margin: 10,
		cursor: 'pointer'
	},
	image: {
		width: '100%',
		height: '100%'
	}
};

export default TemplateItem;
