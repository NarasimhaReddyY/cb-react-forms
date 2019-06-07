import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';

class Checkboxes extends Component {
	render() {
		const { label, options, required } = this.props.item;

		return (
			<div>
				<HeaderLabel label={label} required={required} />
				<div className="form-group">
					{options.map(({ value }) => (
						<div key={value} className="d-block">
							<input id={value} type="checkbox" name={value} />
							<label className="form-lable ml-2" htmlFor={value}>
								{value}
							</label>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Checkboxes;