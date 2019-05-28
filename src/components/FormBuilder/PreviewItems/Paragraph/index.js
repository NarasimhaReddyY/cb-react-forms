import React, { Component } from 'react';
import classNames from 'classnames';

class Paragraph extends Component {
  render() {
    const { bold, italic, alignCenter } = this.props.item;
    const paragraphClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic,
      'text-center': alignCenter
    })

    return (
      <p className={paragraphClass}>Paragraph</p>
    )
  }
}

export default Paragraph;