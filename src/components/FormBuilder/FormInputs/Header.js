import React, { Component } from 'react';
import convertToHtml from './convertDraftjsToHtml';

class Header extends Component {
  render() {
    const text = convertToHtml(this.props.item.label);
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  }
}

export default Header;