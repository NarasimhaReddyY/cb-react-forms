import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import HeaderLabel from "./HeaderLabel";

class Tags extends Component {
  render() {
    const { label, required, options } = this.props.item;
    const animatedComponents = makeAnimated();

    return (
      <div>
        <HeaderLabel label={label} required={required} />
        <Select
          options={options}
          components={animatedComponents}
          isMulti
        />
      </div>
    );
  }
}

export default Tags;
