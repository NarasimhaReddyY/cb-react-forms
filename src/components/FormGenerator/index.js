import React, { Component } from "react";
import { connect } from "react-redux";
import { hideDemo } from "../../actions/formGeneratorActions";
import ValidatedFormInputs from "./ValidatedFormInputs";

class FormGenerator extends Component {
	render() {
		const { hideDemo } = this.props;
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
					<ValidatedFormInputs />
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	{
		hideDemo
	}
)(FormGenerator);
