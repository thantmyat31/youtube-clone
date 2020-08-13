import React from 'react';

import LeftOuterComponent from '../left_component/left_outer_component';
import RightOuterComponent from '../right_component/right_outer_component';
import ProfileImageComponent from '../left_component/profile_image_component';

const TemplatePage = () => {
	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				maxWidth: 900,
				flexDirection: 'row',
				textAlign: 'center',
				margin: '50px auto',
				boxShadow: '0 0 5px 3px #d6d6d6'
			}}
		>
			<div style={{ width: '40%', backgroundColor: '#082239', color: '#ffffff', padding: '30px 0' }}>
				<ProfileImageComponent />
				<LeftOuterComponent />
			</div>
			<div style={{ width: '60%', backgroundColor: '#ffffff' }}>
				<RightOuterComponent />
			</div>
		</div>
	);
};

export default TemplatePage;
