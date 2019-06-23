import React, { Component } from "react";
import Slider from "react-rangeslider";
import HeaderLabel from "./HeaderLabel";

class Range extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.item.value
    };
  }

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { label, required, min, max } = this.props.item;
    const { value } = this.state;

    return (
      <div>
        <HeaderLabel label={label} required={required} />
        <Slider
          min={min}
          max={max}
          step={1}
          value={value}
          labels={{
            [min]: "Low",
            [max]: "High"
          }}
          onChange={this.handleChange}
        />
        <div className="text-center">{value}</div>
      </div>
    );
  }
}

export default Range;
