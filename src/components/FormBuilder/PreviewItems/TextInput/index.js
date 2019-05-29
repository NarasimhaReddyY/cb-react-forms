import React, { Component } from 'react';
import classNames from 'classnames';

class TextInput extends Component {
  render() {
    const { label, required, bold, italic } = this.props.item;
    const textInputClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
    })

    return (
      <div>
        <p>
          <span className={textInputClass}>{label}</span>
          { 
            required ? (
              <span className="ml-1 badge badge-danger">Required</span>
            ) : null
          }
        </p>
        <div className="form-group">
          <input className="form-control" type="text" />
        </div>
      </div>
    )
  }
}

export default TextInput;