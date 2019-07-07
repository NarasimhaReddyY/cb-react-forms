import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';
import map from 'lodash/map';

class Checkboxes extends Component {
  render() {
		const {
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
					<div>
						<HeaderLabel label={item.label} required={item.required} />
						<div className="form-group">
							{item.options.map(({ id, value }) => (
								<div key={id} className="d-block">
									<input id={value} type="checkbox" name={value} />
									<label className="form-label ml-2" htmlFor={value}>
										{value}
									</label>
								</div>
							))}
						</div>
					</div>
				}
				{
					generator && 
					<div>
						{map(options, option => (
							<div className="d-block" key={option.id}>
								<label className="form-label ml-2" htmlFor={option.id}>
									<input
										id={option.id}
										name={option.id}
										value={option.value}
										type="checkbox"
										disabled={readOnly}
										checked={
											defaultValue.some(id => id === option.id) ||
											(Array.isArray(input.value) &&
												input.value.some(id => id === option.id))
										}
										className="mr-2"
										onChange={e => {
											let newValue = [...input.value];
											if (e.target.checked) {
												newValue = [...newValue, option.id];
											} else {
												newValue = newValue.filter(id => id !== option.id);
											}
											return input.onChange(newValue);
										}}
									/>
									{option.value}
								</label>
							</div>
						))}
      			{showError(meta.touched, meta.error, meta.warning)}
					</div>
				}
			</React.Fragment>
    );
  }
}

Checkboxes.defaultProps = {
	generator: false
}

export default Checkboxes;