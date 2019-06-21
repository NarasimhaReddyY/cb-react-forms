import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';

class TextInput extends Component {
	render() {
		const { label, required } = this.props.item;

		return (
  <div>
    <HeaderLabel label={label} required={required} />
    <div className="form-group">
      <input className="form-control" type="text" />
    </div>
  </div>
		);
	}
}

export default TextInput;