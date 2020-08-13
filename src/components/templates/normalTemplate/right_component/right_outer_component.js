import React from 'react';
import AllInfoLists from '../../../../data/info_lists';
import RightInnerComponent from './right_inner_component';

class RightOuterComponent extends React.Component {
	render() {
		return (
			<div>
				{AllInfoLists.map((infolist) => (
					<div key={infolist.id} style={{ borderBottom: '2px solid #e9e9e9' }}>
						<ul style={{ listStyle: 'none', padding: 0 }}>
							<RightInnerComponent item={infolist} />
						</ul>
					</div>
				))}
			</div>
		);
	}
}

export default RightOuterComponent;
