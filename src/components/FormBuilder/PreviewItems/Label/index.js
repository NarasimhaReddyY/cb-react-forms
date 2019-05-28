import React, { Component } from 'react';
import classNames from 'classnames';

class Label extends Component {
  render() {
    const { bold, italic, alignCenter } = this.props.item;
    const labelClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic,
      'text-center': alignCenter
    })

    return (
      <label className={labelClass}>Label</label>
    )
  }
}

export default Label;