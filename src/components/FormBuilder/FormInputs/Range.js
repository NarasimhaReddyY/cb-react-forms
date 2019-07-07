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
			input,
			readOnly,
			formInput,
			generator,
			showError,
			defaultValue,
		} = this.props;

    return (
      <div>
				{
					!generator &&
					<React.Fragment>
						<HeaderLabel label={item.label} required={item.required} />
						<Slider
							min={item.min}
							max={item.max}
							step={item.step}
							value={this.state.value}
							labels={{
								[item.min]: "Low",
								[item.max]: "High"
							}}
							onChange={(value) => this.setState({ value })}
						/>
						<div className="text-center">{this.state.value}</div>
					</React.Fragment>
				}
				{
					generator &&
					<React.Fragment>
						<Slider
							min={formInput.min}
							max={formInput.max}
							step={formInput.step}
							disabled={readOnly}
							value={defaultValue || input.value || 0}
							onChange={val => input.onChange(val)}
							labels={{
								[formInput.min]: "Low",
								[formInput.max]: "High"
							}}
						/>
						<div className="text-center">
							{defaultValue || input.value || 0}
						</div>
						{showError(meta.touched, meta.error, meta.warning)}
					</React.Fragment>
				}
      </div>
    );
  }
}

Range.defaultProps = {
	generator: false
}

export default Range;
