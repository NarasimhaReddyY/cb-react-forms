import React, { Component } from 'react';
import classNames from 'classnames';

class Dropdown extends Component {
  render() {
    const { label, required, bold, italic, options } = this.props.item;
    const dropdownClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
    });

    return (
      <div className="form-group">
        <p>
          <span className={dropdownClass}>{label}</span>
          { 
            required ? (
              <span className="ml-1 badge badge-danger">Required</span>
            ) : null
          }
        </p>
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