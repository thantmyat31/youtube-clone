import React from 'react';
import TemplateItem from '../components/TemplateItem';

const HomePage = () => {
	return (
		<div style={styles.container}>
			<TemplateItem uri="https://i.pinimg.com/originals/c7/ca/00/c7ca00e459063dbe8970ad26d9f6f0b1.png" />
			<TemplateItem uri="https://www.freesumes.com/wp-content/uploads/2017/01/resume-vintage-rose.jpg" />
			<TemplateItem uri="https://www.cv-template.com/img/cv-tips/advantage-of-an-online-cv-builder.jpg" />
			<TemplateItem uri="https://lh4.googleusercontent.com/proxy/d8RqZRc8xst3Bl_zdiQGy4ugzFkB2Zw0eueIIDQEqWgHAnZvaITq530XHmBlqWsAjfLtjSkg8dxNRBHk3fw5y4l4fvRqyHj_rTLAzxCWa3ocPN0K=s0-d" />
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
