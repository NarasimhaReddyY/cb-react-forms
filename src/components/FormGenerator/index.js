import React, { Component } from "react";
import { connect } from "react-redux";
import ValidatedFormInputs from "./ValidatedFormInputs";
import {
	handleInputChange,
	handleCheckboxChange,
	handleTagsChange,
	handleRadioButtonChange,
	hideDemo,
	loadDemo,
} from "../../actions/formGeneratorActions";

class FormGenerator extends Component {

	componentWillMount() {
		if(this.props.userFormData) {
			this.props.loadDemo(this.props.userFormData)
		}
	}
	
	render() {
		const {
			hideDemo,
			onSubmit,
			readOnly,
			userFormData,
			responseData,
			handleTagsChange,
			handleInputChange,
			handleCheckboxChange,
			handleRadioButtonChange,
		} = this.props;
		return (
			<div className="demo-form">
				<div
					className="jumbotron bg-default mt-3 mx-auto"
					style={{
						minHeight: "100%",
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
						formData={userFormData}
						responseData={responseData}
						onSubmit={onSubmit}
						readOnly={readOnly}
						handleInputChange={handleInputChange}
						handleCheckboxChange={handleCheckboxChange}
						handleTagsChange={handleTagsChange}
						handleRadioButtonChange={handleRadioButtonChange}
					/>
				</div>
			</div>
		);
	}
}

FormGenerator.defaultProps = {
	readOnly: false
}

export default connect(
	null,
	{
		hideDemo,
		loadDemo,
		handleInputChange,
		handleCheckboxChange,
		handleTagsChange,
		handleRadioButtonChange
	}
)(FormGenerator);
