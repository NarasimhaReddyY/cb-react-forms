import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";
import map from 'lodash/map';

class RadioButtons extends Component {
  render() {
		const  {
			id,
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

		const options = generator ? this.props.options : this.props.item.options;

		const props = generator ? {
			...input,
			type: "radio",
			disabled: readOnly,
		} : {
			disabled: false,
		}
    return (
			<React.Fragment>
				<HeaderLabel 
					label={generator ? label : item.label} 
					required={generator ? required : item.required}
					readOnly={readOnly}
				/>
				<div className="form-group">
					{map(options, option => (
						<div className="d-block" key={option.id}>
							<input
								{...props}
								id={option.id}
								name={generator ? id : item.id}
								type="radio"
								value={option.value}
								checked={
									generator 
									? defaultValue === option.id || input.value === option.id 
									: null
								}
								onChange={
									generator 
										? () => input.onChange(option.id) 
										: null
								}
							/>
							<label className="form-label ml-2" htmlFor={option.id}>
								{option.label}
							</label>
						</div>
					))}
				</div>
				{generator ? showError(meta.touched, meta.error, meta.warning) : ''}
			</React.Fragment>
    );
  }
}

RadioButtons.defaultProps = {
	generator: false
}

export default RadioButtons;