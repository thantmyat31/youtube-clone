import React from 'react';

const ProfileImageComponent = () => {
	return (
		<div>
			<div>
				<img
					src="https://i.pinimg.com/originals/1b/59/c8/1b59c809d30e78e05a5f1794b33100c8.jpg"
					alt=""
					style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '50%' }}
				/>
			</div>
			<p>Hello I am</p>
			<h2>Your Name</h2>
			<p>Web Designer</p>
		</div>
	);
};

export default ProfileImageComponent;
