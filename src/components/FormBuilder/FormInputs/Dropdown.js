import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';

class Dropdown extends Component {
	render() {
		const { label, required, options } = this.props.item;

		return (
  <div className="form-group">
    <HeaderLabel label={label} required={required} />
    <select className="form-control">
      <option value={null}>Select</option>
      {options.map(({ id, value }) => (
        <option key={id}>{value}</option>
					))}
    </select>
  </div>
		);
	}
}

export default Dropdown;