import React, { Component } from 'react';
import classNames from 'classnames';

class Header extends Component {
  render() {
    const { bold, italic, alignCenter, text } = this.props.item;
    const headerClasss = classNames({
      'font-weight-bold': bold,
      'font-italic': italic,
      'text-center': alignCenter
    });

    return (
      <h2 className={headerClasss}>{text}</h2>
    )
  }
}

export default Header;