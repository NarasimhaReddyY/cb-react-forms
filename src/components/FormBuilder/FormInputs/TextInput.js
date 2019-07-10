import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";

class TextInput extends Component {
  render() {
    
    const  {
      type,
      meta,
      label,
      item,
      input,
      readOnly,
      required,
      generator,
      showError,
      defaultValue,
    } = this.props;

    const props = generator ? {
      type,
      ...input,
      disabled: readOnly,
      className: "form-control",
      value: defaultValue || input.value,
      onChange: e => input.onChange(e.target.value),
      style: {
        borderColor: meta.touched && required && meta.error ? "red" : ""
      },
    } : {
      type,
      className: "form-control",
    }
    
    return (
      <div>
        <HeaderLabel
          label={generator ? label : item.label}
          required={generator ? required : item.required}
          readOnly={readOnly}
        />
        <input {...props} />
        {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
      </div>
    );
  }
}

TextInput.defaultProps = {
  generator: false
}

export default TextInput;
