import React, { Component } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

class Tags extends Component {
  render() {
    const { label, required, bold, italic, options } = this.props.item;
    const tagsClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
    })
    const animatedComponents = makeAnimated();
    return (
      <div>
        <p>
          <span className={tagsClass}>{label}</span>
          { 
            required ? (
              <span className="ml-1 badge badge-danger">Required</span>
            ) : null
          }
        </p>
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