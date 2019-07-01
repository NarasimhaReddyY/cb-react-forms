import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";

class Email extends Component {
  render() {
    const { label, required } = this.props.item;

    return (
      <div>
        <HeaderLabel label={label} required={required} />
        <div className="form-group">
          <input className="form-control" type="email" />
        </div>
      </div>
    );
  }
}

export default Email;
