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
		const  {
			meta,
			item,
			input,
			readOnly,
			generator,
			showError,
			defaultValue,
			numberOfStars,
		} = this.props;

    return (
      <div>
				{
					!generator &&
					<React.Fragment>
						<HeaderLabel label={item.label} required={item.required} />
						<StarRatings
							numberOfStars={item.numberOfStars}
							name="rating"
							starHoverColor="chocolate"
							starRatedColor="orange"
							rating={this.state.value}
							changeRating={value => this.setState({ value })}
						/>
					</React.Fragment>
				}
				{
					generator && 
					<React.Fragment>
						<StarRatings
							numberOfStars={numberOfStars}
							name="rating"
							starHoverColor="chocolate"
							starRatedColor="orange"
							isAggregateRating={true}
							isSelectable={!readOnly}
							rating={defaultValue || input.value || 0}
							changeRating={val => input.onChange(val)}
						/>
						<div>{showError(meta.touched, meta.error, meta.warning)}</div>
					</React.Fragment>
				}
      </div>
    );
  }
}

Rating.deaultProps = {
	generator: false
}

export default Rating;
