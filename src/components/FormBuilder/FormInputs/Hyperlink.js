import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';

class Hyperlink extends Component {
  render() {
		const  {
			type,
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

		const props = generator ? {
			...input,
			style: {borderColor: meta.touched && required && meta.error ? "red" : ""},
			value: defaultValue || input.value,
			disabled: readOnly,
			onChange: e => input.onChange(e.target.value)
		} : {}

    return (
      <div>
				{
					!generator &&
					<React.Fragment>
						<HeaderLabel 
							label={generator ? label : item.label } 
							required={generator ? required : item.required}
							readOnly={readOnly} 
						/>
						<input 
							{...props}
							className="form-control" 
							placeholder="https://www.example.com"
						/>
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

Hyperlink.defaultProps = {
	generator: false
}

export default Hyperlink;