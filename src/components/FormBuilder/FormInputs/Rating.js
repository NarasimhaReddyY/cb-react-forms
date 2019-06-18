import React, { Component } from 'react';
import StarRatings from "react-star-ratings";
import HeaderLabel from './HeaderLabel';

class Rating extends Component {
	render() {
		const { label, required, numberOfStars, value } = this.props.item;

		return (
			<div>
				<HeaderLabel label={label} required={required} />
				<StarRatings
					numberOfStars={numberOfStars}
					name="rating"
					starRatedColor="orange"
					rating={value}
				/>
			</div>
		);
	}
}

export default Rating;