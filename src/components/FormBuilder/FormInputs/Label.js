import React, { Component } from "react";
import convertToHtml from "./convertDraftjsToHtml";

class Label extends Component {
  render() {
    const { label } = this.props.item;
    const text = convertToHtml(label);

    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  }
}

export default Label;
