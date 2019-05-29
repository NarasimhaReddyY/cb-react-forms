import React, { Component } from 'react';
import classNames from 'classnames';
import Slider from "react-rangeslider";

class Range extends Component {
  render() {
    const { label, required, bold, italic } = this.props.item;
    const ratingClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
    });
    const value = 3;

    return (
      <div>
        <p>
          <span className={ratingClass}>{label}</span>
          { 
            required ? (
              <span className="ml-1 badge badge-danger">Required</span>
            ) : null
          }
        </p>
        <Slider 
          min={1}
          max={5}
          value={value}
        />
        <div className="text-center">{value}</div>
      </div>
    )
  }
}

export default Range;