import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';

class Dropdown extends Component {
  render() {
		const  {
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
			...input,
			disabled: readOnly,
			className: "form-control",
			value: defaultValue || input.value,
			onChange: e => input.onChange(e.target.value),
			style: {
				borderColor: meta.touched && required && meta.error ? "red" : ""
			},
		} : {
			className: "form-control"
		}

		const options = generator ? this.props.options : this.props.item.options; 
		
    return (
			<React.Fragment>
				<HeaderLabel 
					label={generator ? label : item.label} 
					required={generator ? required : item.required} 
					readOnly={readOnly}
				/>
				<select {...props}>
					<option value={null} />
					{options.map(({ id, value }) => (
						<option key={id}>{value}</option>
					))}
				</select>
				{generator ? showError(meta.touched, meta.error, meta.warning) : ''}
			</React.Fragment>
    );
  }
}

Dropdown.defaultProps = {
	generator: false,
}

export default Dropdown;