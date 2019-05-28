import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

class Tags extends Component {
  render() {
    const { label, options } = this.props.item;
    const animatedComponents = makeAnimated();
    return (
      <div>
        <label>{label}</label>
        <Select 
          options={options}
          components={animatedComponents}
          isMulti 
        />
      </div>
    )
  }
}

export default Tags;