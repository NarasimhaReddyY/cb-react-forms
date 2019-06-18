import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';

class TextArea extends Component {
	render() {
		const { label, required } = this.props.item;

		return (
			<div>
				<HeaderLabel label={label} required={required} />
				<div className="form-group">
					<textarea className="form-control" type="text" />
				</div>
			</div>
		);
	}
}

export default TextArea;