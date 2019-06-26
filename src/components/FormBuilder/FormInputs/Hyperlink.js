import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';

class Hyperlink extends Component {
  render() {
    const { label, required, value } = this.props.item;

    return (
      <div>
        <HeaderLabel label={label} required={required} />
        <input className="form-control" placeholder="https://www.example.com" />
      </div>
    );
  }
}

export default Hyperlink;