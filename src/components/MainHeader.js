import React from 'react';

import { Link } from 'react-router-dom';

const MainHeader = () => {
	return (
		<header style={{ backgroundColor: '#d6d6d6', padding: '20px 50px' }}>
			<Link to="/">Home</Link>
			<Link to="/template">Templates</Link>
		</header>
	);
};

export default MainHeader;
