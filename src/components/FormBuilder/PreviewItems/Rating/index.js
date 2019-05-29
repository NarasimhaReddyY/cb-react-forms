import React, { Component } from 'react';
import classNames from 'classnames';
import StarRatings from 'react-star-ratings';

class Rating extends Component {
  render() {
    const { label, required, bold, italic } = this.props.item;
    const ratingClass = classNames({
      'font-weight-bold': bold,
      'font-italic': italic
    })
    
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
        <StarRatings
          numberOfStars={5}
          name="rating"
          starRatedColor="orange"
        />
      </div>
    )
  }
}

export default Rating;