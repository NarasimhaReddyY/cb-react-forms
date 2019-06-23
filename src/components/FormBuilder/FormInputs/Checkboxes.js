import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';

class Checkboxes extends Component {
  render() {
    const { label, options, required } = this.props.item;

    return (
  <div>
    <HeaderLabel label={label} required={required} />
    <div className="form-group">
      {options.map(({ id, value }) => (
        <div key={id} className="d-block">
          <input id={value} type="checkbox" name={value} />
          <label className="form-label ml-2" htmlFor={value}>
            {value}
          </label>
        </div>
          ))}
    </div>
  </div>
    );
  }
}

export default Checkboxes;