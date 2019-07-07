import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";
import map from 'lodash/map';

class RadioButtons extends Component {
  render() {
		const  {
			id,
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
      <div>
				{
					!generator &&
					<React.Fragment>
						<HeaderLabel label={item.label} required={item.required} />
						<div className="form-group">
							{item.options.map(({ id, label, value }) => (
								<div key={id} className="d-block">
									<input id={id} type="radio" name="radio" />
									<label className="form-lable ml-2" htmlFor={id}>
										{label}
									</label>
								</div>
							))}
						</div>
					</React.Fragment>
				}
				{
					generator &&
					<React.Fragment>
						{map(options, option => (
							<div className="d-block" key={option.id}>
								<input
									{...input}
									id={option.id}
									type="radio"
									className="form-control"
									name={id}
									disabled={readOnly}
									checked={
										defaultValue === option.id || input.value === option.id
									}
									className="mr-2"
									onChange={() => input.onChange(option.id)}
								/>
								<label className="form-label ml-2" htmlFor={option.id}>
									{option.label}
								</label>
							</div>
						))}
						{showError(meta.touched, meta.error, meta.warning)}
					</React.Fragment>
				}
      </div>
    );
  }
}

RadioButtons.defaultProps = {
	generator: false
}

export default RadioButtons;
