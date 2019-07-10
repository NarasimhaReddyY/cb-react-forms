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
			label,
			readOnly,
			required,
			generator,
			showError,
			defaultValue,
			numberOfStars,
		} = this.props;

		const props = generator ? {
			numberOfStars: numberOfStars,
			isSelectable: !readOnly,
			rating: defaultValue || input.value || 0,
			changeRating: val => input.onChange(val)
		} : {
			numberOfStars: item.numberOfStars,
			rating: this.state.value,
			changeRating: value => this.setState({ value })
		}

    return (
      <div>
				<React.Fragment>
					<HeaderLabel 
						label={generator ? label : item.label} 
						required={generator ? required : item.required} 
						readOnly={readOnly}
					/>
					<StarRatings
						{...props}
						name="rating"
						starHoverColor="chocolate"
						starRatedColor="orange"
					/>
					<div>
						{generator ? showError(meta.touched, meta.error, meta.warning) : ''}
					</div>
				</React.Fragment>
      </div>
    );
  }
}

Rating.deaultProps = {
	generator: false
}

export default Rating;
