import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import HeaderLabel from "./HeaderLabel";

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  render() {
    const { label, required, numberOfStars, value } = this.props.item;

    return (
      <div>
        <HeaderLabel label={label} required={required} />
        <StarRatings
          numberOfStars={numberOfStars}
          name="rating"
          starHoverColor="chocolate"
          starRatedColor="orange"
          rating={this.state.value}
          changeRating={value => this.setState({ value })}
        />
      </div>
    );
  }
}

export default Rating;
