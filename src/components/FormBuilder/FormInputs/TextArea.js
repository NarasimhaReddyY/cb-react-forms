import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";

class TextArea extends Component {
  render() {
    const  {
      meta,
      item,
      input,
      label,
      readOnly,
      required,
      generator,
      showError,
      defaultValue,
    } = this.props;

    const props = generator ? {
      ...input,
      disabled: readOnly,
      className: "form-control",
      value: defaultValue || input.value,
      onChange: e => input.onChange(e.target.value),
      style: {
        borderColor: meta.touched && required && meta.error ? "red" : ""
      }
    } : {
      className:"form-control"
    }

    return (
      <React.Fragment>
        <HeaderLabel 
          label={generator ? label : item.label} 
          required={generator ? required : item.required} 
        />
        <textarea {...props} />
        {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
      </React.Fragment>
    );
  }
}

TextArea.defaultProps = {
  generator: false
}

export default TextArea;
