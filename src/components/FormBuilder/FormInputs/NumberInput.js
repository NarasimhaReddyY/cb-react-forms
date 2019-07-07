import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";

class NumberInput extends Component {
  render() {
		const  {
			type,
			meta,
			item,
			input,
			readOnly,
			required,
			generator,
			showError,
			defaultValue,
		} = this.props;

    return (
			<div>
			{
				!generator &&
				<React.Fragment>
					<HeaderLabel label={item.label} required={item.required} />
					<div className="form-group">
						<input className="form-control" type="number" />
					</div>
				</React.Fragment>
			}
			{
				generator &&
				<React.Fragment>
					<input
						{...input}
						style={{
							borderColor: meta.touched && required && meta.error ? "red" : ""
						}}
						type={type}
						value={defaultValue || input.value}
						disabled={readOnly}
						className="form-control"
						onChange={e => input.onChange(e.target.value)}
					/>
					{showError(meta.touched, meta.error, meta.warning)}
				</React.Fragment>
			}
			</div>
    );
  }
}

NumberInput.defaultProps = {
	generator: false
}

export default NumberInput;
