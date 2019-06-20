import React, { Component } from "react";
import { 
	Field, 
	reduxForm, 
	SubmissionError, 
	Form 
} from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import Select from "react-select";
import { map, includes } from 'lodash';
import makeAnimated from "react-select/animated";
import StarRatings from "react-star-ratings";
import Slider from "react-rangeslider";
import convertDraftjsToHtml from "../FormBuilder/FormInputs/convertDraftjsToHtml";
import { isRequired, validateUrl, isBlank } from "./formValidations";

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

	formInputLabel = (label, required) => {
		return (
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
	};

	renderInputField = ({
		id,
		type,
		input,
		input: { value, onChange },
		required,
		meta: { touched, error, warning }
	}) => {
		return (
			<React.Fragment>
				{type === "textarea" ? (
					<textarea
						{...input}
						style={{
							borderColor: touched && required && error ? "red !important" : ""
						}}
						type={type}
						value={value}
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
						value={value}
						className="form-control"
						onChange={e => onChange(e.target.value)}
					/>
				)}
				{this.showError(touched, error, warning)}
			</React.Fragment>
		);
	};

	renderDropdown = ({
		id,
		input,
		input: { value, onChange },
		options,
		meta: { touched, error, warning }
	}) => (
		<div className="form-group">
			<select
				{...input}
				value={value}
				className="form-control"
				onChange={e => onChange(e.target.value)}
			>
				<option value={null} />
				{options.map(option => (
					<option 
						key={option.id} 
						value={option.value}
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
								checked={Array.isArray(value) && value.some(id => id === option.id)}
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
		animatedComponents,
		meta: { touched, error, warning }
	}) => (
		<React.Fragment>
			<div className="form-group">
				<Select
					value={value}
					options={options}
					components={animatedComponents}
					isMulti
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
							checked={value === option.id}
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
		input: { value, onChange },
		meta: { touched, error, warning }
	}) => {

		let newValue = isBlank(value) ? 0 : value;
		
		return (
			<React.Fragment>
				<StarRatings
					numberOfStars={numberOfStars}
					name="rating"
					starHoverColor="chocolate"
					starRatedColor="orange"
					isAggregateRating={true}
					isSelectable={true}
					rating={newValue}
					changeRating={(val) => onChange(val)}
				/>
				<div>
					{this.showError(touched, error, warning)}
				</div>
			</React.Fragment>
		);
	}

	renderRange = ({
		input,
		input: { value, onChange },
    formInput,
		meta: { touched, error, warning }
	}) => {
		let newValue = isBlank(value) ? value : 0;
		return (
		<React.Fragment>
			<Slider
				{...input}
				min={formInput.min}
				max={formInput.max}
				step={1}
				value={newValue}
				labels={{
					[formInput.min]: "Low",
					[formInput.max]: "High"
				}}
				onChange={val => onChange(val)}
			/>
			<div className="text-center">{value ? value : 0}</div>
			{this.showError(touched, error, warning)}
		</React.Fragment>
	)};

	submit = (values) => {
		console.log('values', values);
		this.props.formData.forEach(formInput => {
			const { id, element, required, value } = formInput;
			if (
				required && isBlank(value)
			) {
				throw new SubmissionError({
					_error: 'Please enter all the required fields'
				})
			} else {
				switch(element) {
					case 'Tags': 
						Object.keys(values).forEach(valueId => {
							if(id === valueId) {
								this.props.handleTagsChange(id, values[valueId])
							}
						})
						break;
					
					case 'TextInput':
					case 'NumberInput':
					case 'Dropdown':
					case 'Rating':
					case 'Range':
					case 'HyperLink':
					case 'TextArea': {
						Object.keys(values).forEach(valueId => {
							if(id === valueId) {
								this.props.handleInputChange(id, values[valueId])
							}
						})
						break;
					}

					case 'Checkboxes': {
						Object.keys(values).forEach(valueId => {
							if(id === valueId) {
								this.props.handleCheckboxChange(valueId, values[valueId])
							}
						})
						break;
					}

					case 'RadioButtons': {
						Object.keys(values).forEach(valueId =>{
							if(id === valueId) {
								this.props.handleRadioButtonChange(valueId, values[valueId])
							} 
						})
						break;
					}

					default: 
						break;
				}
			}
		})
	};

	render() {
		// Animation for Tag Component
		const animatedComponents = makeAnimated();
		
		const {
			formData,
			handleSubmit,
		} = this.props;

		const urlValidator = formInput =>
			formInput.required ? [isRequired, validateUrl] : [validateUrl];

		return (
			<form onSubmit={handleSubmit(this.submit)}>
				{
					map(formData, formInput => {
						const { 
							id, 
							element, 
							value, 
							options,
							required 
						} = formInput;
						let label, labelText;
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
												value,
												type: 'text',
												label: labelText,
												required: required
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
												value,
												type: 'textarea',
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
											validate={required ? [isRequired] : null}
											props={{
												id,
												value,
												type: 'number',
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
												// map(options, option => (
													<React.Fragment>

														<Field
															name={id}
															component={this.renderCheckboxes}
															validate={required ? [isRequired] : null}
															props={{
																options,
															}}
														/>
													</React.Fragment>
												// ))
											}
										</div>
									</React.Fragment>
								)}

								{/* -------------- Tags -------------- */}
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
												value,
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
													options
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
											validate={required ? [isRequired] : null}
											props={{
												id,
												formInput,
											}}
										/>
									</React.Fragment>
								)}
							</div>
						)
					})
				}
				<div style={{ height: "50px" }} className="mt-5">
					<button
						className="btn btn-outline-primary float-right mr-3 mt-5"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		);
	}
}

export default compose(
	reduxForm({
		form: 'form'
	}),
)(ValidatedFormInputs);