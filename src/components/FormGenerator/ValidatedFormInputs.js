import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import Select from "react-select";
import { map } from 'lodash';
import makeAnimated from "react-select/animated";
import StarRatings from "react-star-ratings";
import Slider from "react-rangeslider";
import convertDraftjsToHtml from "../FormBuilder/FormInputs/convertDraftjsToHtml";
import { required, validateUrl } from "./formValidations";
import {
	handleInputChange,
	handleCheckboxChange,
	handleTagsChange,
	handleRadioButtonChange,
	hideDemo
} from "../../actions/formGeneratorActions";
import { Header, Paragraph, Label } from "../FormBuilder/FormInputs";

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
		value,
		isRequired,
		handleInputChange,
		meta: { touched, error, warning }
	}) => {
		return (
			<div>
				{type === "textarea" ? (
					<textarea
						{...input}
						style={{
							borderColor: touched && isRequired && error ? "red" : ""
						}}
						type={type}
						value={value}
						className="form-control"
						onChange={e => handleInputChange(id, e.target.value)}
					/>
				) : (
					<input
						{...input}
						style={{
							borderColor: touched && isRequired && error ? "red" : ""
						}}
						type={type}
						value={value}
						className="form-control"
						onChange={e => handleInputChange(id, e.target.value)}
					/>
				)}
				{this.showError(touched, error, warning)}
			</div>
		);
	};

	renderDropdown = ({
		id,
		value,
		isRequired,
		input,
		options,
		handleInputChange,
		meta: { touched, error, warning }
	}) => (
		<div className="form-group">
			<select
				{...input}
				value={value}
				onChange={e => handleInputChange(id, e.target.value)}
				className="form-control"
				style={{
					borderColor: touched && isRequired && error ? "red" : ""
				}}
			>
				<option value={null} />
				{options.map(option => (
					<option key={option.id} value={option.value}>
						{option.value}
					</option>
				))}
			</select>
			{this.showError(touched, error, warning)}
		</div>
	);

	renderCheckboxes = ({
		id,
		input,
		type,
		value,
		option,
		handleCheckboxChange,
		meta: { touched, error, warning }
	}) => (
		<React.Fragment>
			<div className="d-block" {...input}>
				<label className="form-label ml-2" htmlFor={value}>
					<input
						id={value}
						type={type}
						name={id}
						className="mr-2"
						onChange={() => handleCheckboxChange(id, option.id)}
					/>
					{option.value}
				</label>
			</div>
			{this.showError(touched, error, warning)}
		</React.Fragment>
	);

	renderTags = ({
		id,
		input,
		options,
		value,
		animatedComponents,
		handleTagsChange,
		meta: { touched, error, warning }
	}) => (
		<React.Fragment>
			<div className="form-group">
				<Select
					id={id}
					{...input}
					value={value}
					options={options}
					components={animatedComponents}
					isMulti
					onChange={e => handleTagsChange(id, e)}
				/>
				{this.showError(touched, error, warning)}
			</div>
		</React.Fragment>
	);

	renderRadioButtons = ({
		id,
		input,
		option,
		value,
		handleRadioButtonChange,
		meta: { touched, error, warning }
	}) => (
		<React.Fragment>
			<div className="d-block">
				<label className="form-label ml-2" htmlFor={value}>
					<input
						{...input}
						id={value}
						type="radio"
						name={id}
						className="mr-2"
						onChange={() => handleRadioButtonChange(id, option.id)}
					/>
					{option.label}
				</label>
				{this.showError(touched, error, warning)}
			</div>
		</React.Fragment>
	);

	renderRating = ({
		input,
		formInput,
		handleInputChange,
		meta: { touched, error, warning }
	}) => {

		return (
			<div>
				<StarRatings
					{...input}
					numberOfStars={formInput.numberOfStars}
					name="rating"
					starHoverColor="chocolate"
					starRatedColor="orange"
					isAggregateRating={true}
					isSelectable={true}
					rating={formInput.value}
					changeRating={value =>
						handleInputChange(formInput.id, value)
					}
				/>
				{this.showError(touched, error, warning)}
			</div>
		);
	}

	renderRange = ({
		input,
    formInput,
    handleInputChange,
		meta: { touched, error, warning }
	}) => (
		<React.Fragment>
			<Slider
				{...input}
				min={formInput.min}
				max={formInput.max}
				step={1}
				value={formInput.value}
				labels={{
					[formInput.min]: "Low",
					[formInput.max]: "High"
				}}
				onChange={val => handleInputChange(formInput.id, val)}
				validate={[required]}
			/>
			<div className="text-center">{formInput.value}</div>
			{this.showError(touched, error, warning)}
		</React.Fragment>
	);

	render() {
		// Animation for Tag Component
		const animatedComponents = makeAnimated();
		
		const {
			formData,
			handleInputChange,
			handleCheckboxChange,
			handleTagsChange,
			handleRadioButtonChange,
			hideDemo
		} = this.props;

		console.log(formData, 'rendering');
		
		const urlValidator = formInput =>
			formInput.required ? [required, validateUrl] : [validateUrl];

		return (
			<form>
				{
					map(formData, formInput => {
						const { id, element, value, options } = formInput;
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
										{this.formInputLabel(label, formInput.required)}
										<Field
											name={labelText}
											component={this.renderInputField}
											type="text"
											label={labelText}
											validate={formInput.required ? [required] : null}
											isRequired={formInput.required}
											value={value}
											id={id}
											handleInputChange={handleInputChange}
										/>
									</div>
								)}

								{/* -------------- TEXTAREA -------------- */}
								{element === "TextArea" && (
									<div className="form-group">
										{this.formInputLabel(label, formInput.required)}
										<Field
											name={labelText}
											component={this.renderInputField}
											type="textarea"
											validate={formInput.required ? [required] : null}
											isRequired={formInput.required}
											value={value}
											id={id}
											handleInputChange={handleInputChange}
										/>
									</div>
								)}

								{/* -------------- NUMBER INPUT TAG -------------- */}
								{element === "NumberInput" && (
									<div className="form-group">
										{this.formInputLabel(label, formInput.required)}
										<Field
											name={labelText}
											component={this.renderInputField}
											type="number"
											isRequired={formInput.required}
											validate={formInput.required ? [required] : null}
											value={value}
											id={id}
											handleInputChange={handleInputChange}
										/>
									</div>
								)}

								{/* -------------- DROPDOWN -------------- */}
								{element === "Dropdown" && (
									<React.Fragment>
										{this.formInputLabel(label, formInput.required)}
										<Field
											name={labelText}
											component={this.renderDropdown}
											className="form-control"
											validate={formInput.required ? [required] : null}
											options={options}
											id={id}
											handleInputChange={handleInputChange}
										/>
									</React.Fragment>
								)}

								{/* -------------- CHECKBOXES -------------- */}
								{element === "Checkboxes" && (
									<React.Fragment>
										{this.formInputLabel(label, formInput.required)}
										<div className="from-group">
											{options.map(option => (
												<Field
													id={id}
													key={option.id}
													name={option.value}
													value={option.value}
													type="checkbox"
													component={this.renderCheckboxes}
													option={option}
													handleCheckboxChange={handleCheckboxChange}
												/>
											))}
										</div>
									</React.Fragment>
								)}

								{/* -------------- Tags -------------- */}
								{element === "Tags" && (
									<React.Fragment>
										{this.formInputLabel(label, formInput.required)}
										<Field
											id={id}
											name={labelText}
											component={this.renderTags}
											validate={formInput.required ? [required] : null}
											options={options}
											value={value}
											animatedComponents={animatedComponents}
											handleTagsChange={handleTagsChange}
										/>
									</React.Fragment>
								)}

								{/* -------------- RADIO BUTTONS -------------- */}
								{element === "RadioButtons" && (
									<React.Fragment>
										{this.formInputLabel(label, formInput.required)}
										<div className="form-group">
											{options.map(option => (
												<React.Fragment key={option.id}>
													<Field
														name={id}
														id={id}
														component={this.renderRadioButtons}
														handleRadioButtonChange={handleRadioButtonChange}
														option={option}
													/>
												</React.Fragment>
											))}
										</div>
									</React.Fragment>
								)}

								{/* -------------- STAR RATING -------------- */}
								{element === "Rating" && (
									<React.Fragment>
										{this.formInputLabel(label, formInput.required)}
										<Field
											id={id}
											name={element}
											component={this.renderRating}
											value={formInput.value}
											numberOfStars={formInput.numberOfStars}
											handleInputChange={handleInputChange}
											formInput={formInput}
										/>
									</React.Fragment>
								)}

								{/* -------------- HYPERLINK -------------- */}
								{element === "HyperLink" && (
									<React.Fragment>
										{this.formInputLabel(label, formInput.required)}
										<Field
											id={id}
											name={element}
											component={this.renderInputField}
											value={value}
											handleInputChange={handleInputChange}
											validate={urlValidator(formInput)}
										/>
									</React.Fragment>
								)}

								{/* -------------- RANGE -------------- */}
								{element === "Range" && (
									<React.Fragment>
										{this.formInputLabel(label, formInput.required)}
										<Field
											id={id}
											name={element}
											component={this.renderRange}
											handleInputChange={handleInputChange}
											validate={[required]}
											formInput={formInput}
										/>
									</React.Fragment>
								)}
							</div>
						)
					})
				}
				<div style={{ height: "50px" }} className="mt-5">
					<button
						className="btn btn-outline-secondary float-right mt-5"
						onClick={hideDemo}
					>
						Close
					</button>
					<button
						className="btn btn-outline-primary float-right mr-3 mt-5"
						disabled
					>
						Submit
					</button>
				</div>
			</form>
		);
	}
}

export default compose(
	connect(
		state =>  ({
			formData: state.formGenerator.formData
		}),
		{
			hideDemo,
			handleInputChange,
			handleCheckboxChange,
			handleTagsChange,
			handleRadioButtonChange
		}
	),
	reduxForm({
		form: 'form'
	})
)(ValidatedFormInputs);