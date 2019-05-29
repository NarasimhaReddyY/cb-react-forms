import React, { Component } from 'react';
import classNames from 'classnames';

class RadioButtons extends Component {
  render() {
    const { label, options, required, bold, italic } = this.props.item;
    const radiobuttonsClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
    })

    return (
      <div>
        <p>
          <span className={radiobuttonsClass}>{label}</span>
          { 
            required ? (
              <span className="ml-1 badge badge-danger">Required</span>
            ) : null
          }
        </p>
        <div className="form-group">
          {
            options.map(option => (
              <div key={option.value} className="d-block">
                <input id={option.value} type="radio" name="radio" />
                <label className="form-lable ml-2" htmlFor={option.value}>
                  {option.label}
                </label>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default RadioButtons;