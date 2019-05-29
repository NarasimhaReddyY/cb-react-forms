import React, { Component } from 'react';
import classNames from 'classnames';

class NumberInput extends Component {
  render() {
    const { label, required, bold, italic } = this.props.item;
    const numberInputClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
    })

    return (
      <div>
        <p>
          <span className={numberInputClass}>{label}</span>
          { 
            required ? (
              <span className="ml-1 badge badge-danger">Required</span>
            ) : null
          }
        </p>
        <div className="form-group">
          <input className="form-control" type="number" />
        </div>
      </div>
    )
  }
}

export default NumberInput;