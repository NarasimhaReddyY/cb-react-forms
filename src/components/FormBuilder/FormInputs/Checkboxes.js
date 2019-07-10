import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';
import map from 'lodash/map';

class Checkboxes extends Component {

	handleChange = (checked, input, id) => {
		let newValue = [...input.value];
		checked 
			? newValue = [...newValue, id] 
			: newValue = newValue.filter(i => i !== id); 
		return input.onChange(newValue)
	}

  render() {
		const {
			type,
			meta,
			item,
			label,
			input,
			required,
			readOnly,
			generator,
			showError,
			defaultValue,
		} = this.props;

		const props = generator ? {
			type,
			...input,
			disabled: readOnly,
			className: "mr-2",
		} : {
			type: 'checkbox',
			disabled: false,
			className: "mr-2"
		}

		const options = generator ? this.props.options : this.props.item.options; 

    return (
			<React.Fragment>
				<HeaderLabel 
					label={generator ? label : item.label} 
					required={generator ? required : item.required}
					readOnly={readOnly} 
				/>
				<div className="form-group">
					{map(options, ({ id, value }) => (
						<div key={id} className="d-block">
							<input 
								{...props} 
								id={value}
								name={value}
								value={value}
								checked={ 
									generator 
									? defaultValue.some(i => i === id) 
										|| (Array.isArray(input.value) 
										&& input.value.some(i => i === id))
									: null
								}
								onChange={
									generator 
									? e => this.handleChange(e.target.checked, input, id)
									: null}
							/>
							<label className="form-label ml-2" htmlFor={value}>
								{value}
							</label>
						</div>
					))}
				</div>
				{generator ? showError(meta.touched, meta.error, meta.warning) : ''}
			</React.Fragment>
    );
  }
}

Checkboxes.defaultProps = {
	generator: false
}

export default Checkboxes;