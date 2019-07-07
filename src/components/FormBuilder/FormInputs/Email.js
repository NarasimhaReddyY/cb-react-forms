import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";

class Email extends Component {
  render() {
		
		const { 
			type,
			item,
			meta,
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
							<input className="form-control" type="email" />
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

Email.defaultProps = {
	generator: false
};

export default Email;
