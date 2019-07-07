import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';

class Dropdown extends Component {
  render() {
		const  {
			meta,
			item,
			input,
			options,
			readOnly,
			generator,
			showError,
			defaultValue,
		} = this.props;
		
    return (
			<React.Fragment>
				{
					!generator &&
					<div className="form-group">
						<HeaderLabel label={item.label} required={item.required} />
						<select className="form-control">
							<option value={null}>Select</option>
							{item.options.map(({ id, value }) => (
								<option key={id}>{value}</option>
									))}
						</select>
					</div>
				}
				{
					generator &&
					<div className="form-group">
						<select
							{...input}
							value={defaultValue || input.value}
							disabled={readOnly}
							className="form-control"
							onChange={e => input.onChange(e.target.value)}
						>
							<option value={null} />
							{options.map(option => (
								<option key={option.id} value={option.id}>
									{option.value}
								</option>
							))}
						</select>
						{showError(meta.touched, meta.error, meta.warning)}
					</div>
				}
			</React.Fragment>
    );
  }
}

Dropdown.defaultProps = {
	generator: false,
}

export default Dropdown;