import React, { Component } from 'react';
import classNames from 'classnames';

class Label extends Component {
  render() {
    const { bold, italic, label } = this.props.item;
    const labelClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
    })

    return (
      <label className={labelClass}>{label}</label>
    )
  }
}

export default Label;