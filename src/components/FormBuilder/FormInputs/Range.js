import React, { Component } from "react";
import Slider from "react-rangeslider";
import HeaderLabel from "./HeaderLabel";

class Range extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }
  
  componentDidMount() {
    if(!this.props.generator) {
      this.setState({ value: this.props.item.value })
    }
  }
  

  render() {
    const  {
      meta,
      item,
      label,
      input,
      required,
      readOnly,
      formInput,
      generator,
      showError,
      className,
      defaultValue,
    } = this.props;

    const _props = generator ? {
      min: formInput.min,
      max: formInput.max,
      step: formInput.step,
      disabled: readOnly,
      value: defaultValue || input.value || 0,
      onChange: val => input.onChange(val),
      labels: {
        [formInput.min]: "Low",
        [formInput.max]: "High"
      }
    } : {
      min: item.min,
      max: item.max,
      step: item.step,
      value: this.state.value,
      onChange: value => this.setState({ value }),
      labels: {
        [item.min]: "Low",
        [item.max]: "High"
      }
    }

    return (
      <React.Fragment>
        <HeaderLabel 
          label={generator ? label : item.label} 
          required={generator ? required : item.required}
          readOnly={readOnly} 
        />
        <Slider {..._props} />
        <div className={className}>
          {generator 
            ? (defaultValue || input.value || 0) 
            : this.state.value}
        </div>
        <div>
          {generator ? showError(meta.touched, meta.error, meta.warning) : ''}
        </div>
      </React.Fragment>
    );
  }
}

Range.defaultProps = {
  generator: false,
  className: "text-center"
}

export default Range;
