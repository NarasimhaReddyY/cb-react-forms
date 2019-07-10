import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import HeaderLabel from "./HeaderLabel";

class Tags extends Component {

	handleChange = (action, input, removedValue, val) => {
		let newValue = [...input.value];
		if (action === "select-option") {
			newValue = [...val];
		} else if (action === "remove-value") {
			newValue.splice(newValue.indexOf(removedValue), 1);
		} else if (action === "clear") {
			newValue = [];
		}
		return input.onChange(newValue);
	}

  render() {
		const  {
			meta,
			item,
			input,
			label,
			readOnly,
			required,
			generator,
			showError,
			defaultValue,
		} = this.props;

		const animatedComponents = makeAnimated();
		
		const options = generator ? this.props.options : this.props.item.options;

		const props = generator ? {
			value: defaultValue || input.value,
			options: options,
			components: animatedComponents,
			isMulti: true,
			isDisabled: readOnly,
			onChange: (val, { action, removedValue }) => 
				this.handleChange(action, input, removedValue, val)
		} : {
			options,
			components: animatedComponents,
			isMulti: true
		}


    return (
			<React.Fragment>
				<HeaderLabel 
					label={generator ? label : item.label} 
					required={generator ? required : item.required} 
					readOnly={readOnly}
				/>
				<Select {...props} />
				{generator ? showError(meta.touched, meta.error, meta.warning) : ''}
			</React.Fragment>
    );
  }
}

Tags.defaultProps = {
	generator: false
}

export default Tags;
