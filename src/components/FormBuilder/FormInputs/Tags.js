import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import HeaderLabel from "./HeaderLabel";

class Tags extends Component {
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

    const animatedComponents = makeAnimated();

    return (
			<React.Fragment>
				{
					!generator &&
					<div>
						<HeaderLabel label={item.label} required={item.required} />
						<Select
							options={item.options}
							components={animatedComponents}
							isMulti
						/>
					</div>
				}
				{
					generator &&
					<React.Fragment>
						<div className="form-group">
							<Select
								value={defaultValue || input.value}
								options={options}
								components={animatedComponents}
								isMulti
								isDisabled={readOnly}
								onChange={(val, { action, removedValue }) => {
									let newValue = [...input.value];
									if (action === "select-option") {
										newValue = [...val];
									} else if (action === "remove-value") {
										newValue.splice(newValue.indexOf(removedValue), 1);
									} else if (action === "clear") {
										newValue = [];
									}
									return input.onChange(newValue);
								}}
							/>
							{showError(meta.touched, meta.error, meta.warning)}
						</div>
					</React.Fragment>
				}
			</React.Fragment>
    );
  }
}

Tags.defaultProps = {
	generator: false
}

export default Tags;
