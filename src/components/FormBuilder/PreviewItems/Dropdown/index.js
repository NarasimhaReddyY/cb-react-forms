import React, { Component } from 'react';

class Dropdown extends Component {
  render() {
    const { label, options } = this.props.item;
    return (
      <div className="form-group">
        <label className="form-label">
          {label}
        </label>
        <select className="form-control">
          {
            options.map((option, i) => (
              <option key={i}>{option}</option>
            ))
          }
        </select>
      </div>
    )
  }
}

export default Dropdown;