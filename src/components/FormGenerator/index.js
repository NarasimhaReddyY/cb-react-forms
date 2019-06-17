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
					<form>
						<React.Fragment>
							<ValidatedFormInputs />
							<div style={{ height: "50px" }} className="mt-5">

								<button
									className="btn btn-outline-secondary float-right mt-5"
									onClick={hideDemo}
								>
									Close
								</button>
								<button
									className="btn btn-outline-primary float-right mr-3 mt-5"
									type="submit"
									disabled
								>
									Submit
								</button>
							</div>
						</React.Fragment>
					</form>
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
