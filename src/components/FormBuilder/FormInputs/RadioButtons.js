import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';

class RadioButtons extends Component {
	render() {
		const { label, options, required } = this.props.item;

		return (
  <div>
    <HeaderLabel label={label} required={required} />
    <div className="form-group">
      {options.map(({ id, label, value }) => (
        <div key={id} className="d-block">
          <input id={value} type="radio" name="radio" />
          <label className="form-lable ml-2" htmlFor={value}>
            {label}
          </label>
        </div>
					))}
    </div>
  </div>
		);
	}
}

export default RadioButtons;