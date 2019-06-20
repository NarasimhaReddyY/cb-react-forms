import React, { Component } from "react";
import { connect } from "react-redux";
import ValidatedFormInputs from "./ValidatedFormInputs";
import {
	handleInputChange,
	handleCheckboxChange,
	handleTagsChange,
	handleRadioButtonChange,
	hideDemo
} from "../../actions/formGeneratorActions";

class FormGenerator extends Component {
	render() {
		const {
			formData,
			handleInputChange,
			handleCheckboxChange,
			handleTagsChange,
			handleRadioButtonChange,
			hideDemo
		} = this.props;
		
		return (
			<div className="demo-form">
				<div
					className="jumbotron bg-default mt-3 mx-auto"
					style={{
						height: "100%",
						maxWidth: "700px",
						border: "1px solid #ccc"
					}}
				>
					<div style={{ height: '50px' }}>
						<span
							className="float-right"
							style={{ cursor: "pointer" }}
							onClick={hideDemo}
						>
							<i className="fa fa-times" />
						</span>
					</div>
					<ValidatedFormInputs 
						formData={formData}
						handleInputChange= {handleInputChange}
						handleCheckboxChange= {handleCheckboxChange}
						handleTagsChange= {handleTagsChange}
						handleRadioButtonChange= {handleRadioButtonChange}
					/>
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	{
		hideDemo,
		handleInputChange,
		handleCheckboxChange,
		handleTagsChange,
		handleRadioButtonChange
	}
)(FormGenerator);
