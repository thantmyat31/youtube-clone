import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const TemplateItem = () => {
	const [ isMouseOver, setIsMouseOver ] = useState(false);

	return (
		<Link to="/template">
			<div
				style={isMouseOver ? { ...styles.item, boxShadow: '0 0 5px 2px #d6d6d6' } : styles.item}
				onMouseOver={() => setIsMouseOver(true)}
				onMouseOut={() => setIsMouseOver(false)}
			>
				<img
					width="100%"
					height="100%"
					src="https://i.pinimg.com/originals/c7/ca/00/c7ca00e459063dbe8970ad26d9f6f0b1.png"
				/>
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
	}
};

export default TemplateItem;
