import React, { Component } from "react";
import { 
	Field, 
	reduxForm
} from "redux-form";
import { compose } from "redux";
import Select from "react-select";
import { map } from 'lodash';
import makeAnimated from "react-select/animated";
import StarRatings from "react-star-ratings";
import Slider from "react-rangeslider";
import convertDraftjsToHtml from "../FormBuilder/FormInputs/convertDraftjsToHtml";
import { 
	isRequired, 
	validateUrl,
	isNumber, 
	isBlank,
} from "./formValidations";

import { 
	Header, 
	Paragraph, 
	Label 
} from "../FormBuilder/FormInputs";

class ValidatedFormInputs extends Component {

	showError = (touched, error, warning) =>
		touched &&
		((error && <span className="text-danger m-3">{error}</span>) ||
			(warning && <span className="text-warning">{warning}</span>));

	formInputLabel = (label, required) => (
		<React.Fragment>
			{required ? (
				<span
					style={{ borderTop: "100%" }}
					className="badge badge-danger float-right"
				>
					Required
				</span>
					) : null}
			<p dangerouslySetInnerHTML={{ __html: label }} />
		</React.Fragment>
	);

	renderInputField = ({
		type,
		input,
		readOnly,
		required,
		defaultValue,
		input: { value, onChange },
		meta: { touched, error, warning }
	}) => (
  <React.Fragment>
    {type === "textarea" ? (
      <textarea
        {...input}
        style={{
					borderColor: touched && required && error ? "red !important" : ""
				}}
				type={type}
				disabled={readOnly}
        value={defaultValue || value}
        className="form-control"
        onChange={e => onChange(e.target.value)}
      />
			) : (
			<input
				{...input}
				style={{
					borderColor: touched && required && error ? "red" : ""
				}}
				type={type}
				value={defaultValue || value}
				disabled={readOnly}
				className="form-control"
				onChange={e => onChange(e.target.value)}
			/>
			)}
		{this.showError(touched, error, warning)}
  </React.Fragment>
		);

	renderDropdown = ({
		input,
		input: { value, onChange },
		options,
		defaultValue,
		readOnly,
		meta: { touched, error, warning }
	}) => (
		<div className="form-group">
			<select
				{...input}
				value={defaultValue || value}
				disabled={readOnly}
				className="form-control"
				onChange={e => onChange(e.target.value)}
			>
				<option value={null} />
				{options.map(option => (
					<option 
						key={option.id} 
						value={option.id}
					>
						{option.value}
					</option>
					))}
			</select>
			{this.showError(touched, error, warning)}
		</div>
	);

	renderCheckboxes = ({
		input: { onChange, value },
		options,
		readOnly,
		defaultValue,
		meta: { touched, error, warning }
	}) => (
		<React.Fragment>
			{
				map(options, option => (
				<div className="d-block" key={option.id}>
					<label className="form-label ml-2" htmlFor={option.id}>
						<input
							id={option.id}
							name={option.id}
							value={option.value}
							type="checkbox"
							disabled={readOnly}
							checked={defaultValue.some(id => id === option.id) || Array.isArray(value) && value.some(id => id === option.id)}
							className="mr-2"
							onChange={e => {
								let newValue = [...value];
								if(e.target.checked) {
									newValue = [...newValue, option.id]
								} else {
									newValue = newValue.filter(id => id !== option.id)
								}
								return onChange(newValue);
							}}
						/>
						{option.value}
					</label>
				</div>
				))
			}
			{this.showError(touched, error, warning)}
		</React.Fragment>
	);

	renderTags = ({
		input: { value, onChange },
		options,
		readOnly,
		defaultValue,
		animatedComponents,
		meta: { touched, error, warning }
	}) => (
		<React.Fragment>
			<div className="form-group">
				<Select
					value={defaultValue || value}
					options={options}
					components={animatedComponents}
					isMulti
					isDisabled={readOnly}
					onChange={(val, { action, removedValue }) => {
						let newValue = [...value];
						if(action === 'select-option') {
							newValue = [...val];
						} else if (action === 'remove-value') {
							newValue.splice(
								newValue.indexOf(
									removedValue
								), 1)
						} else if (action === 'clear') {
							newValue = []
						}

						return onChange(newValue);
					}}
				/>
				{this.showError(touched, error, warning)}
			</div>
		</React.Fragment>
	);

	renderRadioButtons = ({
		id,
		input,
		input: { value, onChange },
		options,
		readOnly,
		defaultValue,
		meta: { touched, error, warning }
	}) => (
		<React.Fragment>
			{
				map(options, option => (
					<div className="d-block" key={option.id}>
						<input
							{...input}
							id={option.id}
							type="radio"
							name={id}
							disabled={readOnly}
							checked={defaultValue === option.id || value === option.id}
							className="mr-2"
							onChange={() => onChange(option.id)}
						/>
						<label 
							className="form-label ml-2" 
							htmlFor={option.id}
						>
							{option.label}
						</label>
					</div>
				))
			}
			{this.showError(touched, error, warning)}
		</React.Fragment>
	);

	renderRating = ({
		numberOfStars,
		input,
		defaultValue,
		readOnly,
		input: { value, onChange },
		meta: { touched, error, warning }
	}) => {

	const newValue = value === '' ? 0 : value;
		
	return (
		<React.Fragment>
			<StarRatings
				{...input}
				numberOfStars={numberOfStars}
				name="rating"
				starHoverColor="chocolate"
				starRatedColor="orange"
				isAggregateRating
				isSelectable={!readOnly}
				rating={defaultValue || newValue}
				changeRating={(val) => onChange(val)}
			/>
			<div>
				{this.showError(touched, error, warning)}
			</div>
		</React.Fragment>
	)};

	renderRange = ({
		input,
		input: { value, onChange },
		formInput,
		readOnly,
		defaultValue,
		meta: { touched, error, warning }
	}) => {
		const newValue = isBlank(value) ? 0 : value;
		return (
			<React.Fragment>
				<Slider
					{...input}
					min={formInput.min}
					max={formInput.max}
					step={1}
					disabled={readOnly}
					value={defaultValue || newValue}
					labels={{
							[formInput.min]: "Low",
							[formInput.max]: "High"
						}}
					onChange={val => onChange(val)}
				/>
				<div className="text-center">{defaultValue || newValue || 0}</div>
				{this.showError(touched, error, warning)}
			</React.Fragment>
		)
	};

	render() {
		// Animation for Tag Component
		const animatedComponents = makeAnimated();
		
		const {
			formData,
			onSubmit,
			readOnly,
			handleSubmit,
			responseData
		} = this.props;

		const urlValidator = formInput =>
			formInput.required ? [isRequired, validateUrl] : [validateUrl];

		return (
			<form 
				onSubmit={handleSubmit(values => onSubmit(values))}
			>
				{
					map(formData, formInput => {
						const { 
							id, 
							element, 
							value, 
							options,
							required 
						} = formInput;
		
						let label; let labelText;
						if (element !== "LineBreak") {
							// richText label
							label = convertDraftjsToHtml(formInput.label);

							// text label
							labelText =
								formInput.label.blocks && formInput.label.blocks[0].text;
						}

						return (
							<div key={formInput.id} className="mb-4">
								{/* -------------- HEADER -------------- */}
								{element === "Header" && (
								<Header item={{ label: formInput.label }} />
								)}

								{/* -------------- PARAGRAPH -------------- */}
								{element === "Paragraph" && (
								<Paragraph item={{ label: formInput.label }} />
								)}

								{/* -------------- LABEL -------------- */}
								{element === "Label" && (
								<Label item={{ label: formInput.label }} />
								)}

								{/* -------------- LINEBREAK -------------- */}
								{element === "LineBreak" && <hr />}

								{/* -------------- INPUT TAG -------------- */}
								{element === "TextInput" && (
								<div className="form-group">
									{this.formInputLabel(label, required)}
									<Field
										name={id}
										component={this.renderInputField}
										validate={required ? [isRequired] : null}
										props={{
											id,
											defaultValue: responseData && responseData[id],
											required,
											readOnly,
											type: 'text',
											label: labelText,
										}}
									/>
								</div>
								)}

								{/* -------------- TEXTAREA -------------- */}
								{element === "TextArea" && (
								<div className="form-group">
									{this.formInputLabel(label, required)}
									<Field
										name={id}
										component={this.renderInputField}
										validate={required ? [isRequired] : null}
										props={{
											id,
											defaultValue: responseData && responseData[id],
											type: 'textarea',
											readOnly,
											isRequired: required,
										}}
									/>
								</div>
								)}

								{/* -------------- NUMBER INPUT TAG -------------- */}
								{element === "NumberInput" && (
								<div className="form-group">
									{this.formInputLabel(label, required)}
									<Field
										name={id}
										component={this.renderInputField}
										validate={required ? [isRequired, isNumber] : [isNumber]}
										props={{
											id,
											defaultValue: responseData && responseData[id],
											type: 'number',
											readOnly,
											isRequired: required,
										}}
									/>
								</div>
								)}

								{/* -------------- DROPDOWN -------------- */}
								{element === "Dropdown" && (
								<React.Fragment>
									{this.formInputLabel(label, required)}
									<Field
										name={id}
										component={this.renderDropdown}
										validate={required ? [isRequired] : null}
										props={{
											options,
											id,
											readOnly,
											defaultValue: responseData && responseData[id]
										}}
									/>
								</React.Fragment>
								)}

								{/* -------------- CHECKBOXES -------------- */}
								{element === "Checkboxes" && (
								<React.Fragment>
									{this.formInputLabel(label, required)}
									<div className="from-group">
										{
											<Field
												name={id}
												component={this.renderCheckboxes}
												validate={required ? [isRequired] : null}
												props={{
													options,
													readOnly,
													defaultValue: responseData && responseData[id] || []
												}}
											/>
										}
									</div>
								</React.Fragment>
								)}

								{/* -------------- TAGS -------------- */}
								{element === "Tags" && (
									<React.Fragment>
										{this.formInputLabel(label, required)}
										<Field
											name={id}
											component={this.renderTags}
											validate={required ? [isRequired] : null}
											props={{
												id,
												options,
												defaultValue: responseData && responseData[id],
												readOnly,
												animatedComponents,
											}}
										/>
									</React.Fragment>
								)}

								{/* -------------- RADIO BUTTONS -------------- */}
								{element === "RadioButtons" && (
									<React.Fragment>
										{this.formInputLabel(label, required)}
										<div className="form-group">
											<Field
												name={id}
												component={this.renderRadioButtons}
												validate={required ? [isRequired] : null}
												props={{
													id,
													options,
													defaultValue: responseData && responseData[id],
													readOnly
												}}
											/>
										</div>
									</React.Fragment>
								)}

								{/* -------------- STAR RATING -------------- */}
								{element === "Rating" && (
								<React.Fragment>
									{this.formInputLabel(label, required)}
									<Field
										name={id}
										component={this.renderRating}
										validate={required ? [isRequired] : null}
										props={{
											id,
											readOnly,
											defaultValue: responseData && responseData[id],
											numberOfStars: formInput.numberOfStars
										}}
									/>
								</React.Fragment>
								)}

								{/* -------------- HYPERLINK -------------- */}
								{element === "HyperLink" && (
								<React.Fragment>
									{this.formInputLabel(label, required)}
									<Field
										name={id}
										component={this.renderInputField}
										validate={urlValidator(formInput)}
										props={{
											id,
											readOnly,
											defaultValue: responseData && responseData[id],
											value,
										}}
									/>
								</React.Fragment>
								)}

								{/* -------------- RANGE -------------- */}
								{element === "Range" && (
									<React.Fragment>
										{this.formInputLabel(label, required)}
										<Field
											name={id}
											component={this.renderRange}
											validate={required ? [isBlank] : null}
											props={{
												id,
												defaultValue: responseData && responseData[id],
												readOnly,
												formInput,
											}}
										/>
									</React.Fragment>
								)}
							</div>
						)
					})
				}
				{
					!readOnly &&
					<div style={{ height: "50px" }} className="mt-5">
						<button
							className="btn btn-outline-primary float-right mr-3"
							type="submit"
						>
							Submit	
						</button>
					</div>
				}
			</form>
		);
	}
}

export default compose(
	reduxForm({
		form: 'form'
	}),
)(ValidatedFormInputs);