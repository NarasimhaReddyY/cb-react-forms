import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';

class Hyperlink extends Component {
	render() {
		const { label, required, url } = this.props.item;

		return (
			<div>
				<HeaderLabel label={label} required={required} />
				<a target="_blank" href={url}>
					{url}
				</a>
			</div>
		);
	}
}

export default Hyperlink;