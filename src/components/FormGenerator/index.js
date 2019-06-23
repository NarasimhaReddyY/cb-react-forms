import React from "react";
import PropTypes from "prop-types";
import ValidatedFormInputs from "./ValidatedFormInputs";

const FormGenerator = ({
	onSubmit,
	readOnly,
	formData,
	responseData
}) => {
	return (
		<div
			className="jumbotron bg-default mt-5 mx-auto"
			style={{
				minHeight: "100%",
				maxWidth: "700px",
				border: "1px solid #ccc"
			}}
		>
			<ValidatedFormInputs
				formData={formData}
				responseData={responseData}
				onSubmit={onSubmit}
				readOnly={readOnly}
			/>
		</div>
	);
};

FormGenerator.propTypes = {
	formData: PropTypes.array.isRequired,
	onSubmit: PropTypes.func.isRequired,
	responseData: PropTypes.object,
	readOnly: PropTypes.bool
};

FormGenerator.defaultProps = {
	readOnly: false
};

export default FormGenerator;
