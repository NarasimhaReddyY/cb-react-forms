import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import convertDraftjsToHtml from '../FormBuilder/FormInputs/convertDraftjsToHtml';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { required } from './formValidations';
import { handleInputChange } from '../../actions/formGeneratorActions';

class ValidatedFormInputs extends Component {

  forminputLabel = (label, required) => {
    return (
      <React.Fragment>
        {required ? (
          <span 
            style={{ borderTop: '100%' }} 
            className="badge badge-danger float-right"
          >
            Required
          </span>
        ) : null}
        <p dangerouslySetInnerHTML={{ __html: label }} /> 
      </React.Fragment>
    )
  }

  renderInputField = (
    {
      id,
      handleInputChange,
      value,
      isRequired,
      input,
      type,
      meta: {
        touched,
        error,
        warning
      }
    }
  ) => {
    return (
      <div >
        {
          type === "textarea" ?
          (<textarea 
            {...input}
            style={{ 
              borderColor: touched && isRequired && error ? 'red' : '' 
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
                borderColor: touched && isRequired && error ? 'red' : '' 
              }}
              type={type}
              value={value}
              className="form-control"
              onChange={e => handleInputChange(id, e.target.value)} 
            />
          )
        }
        {
          touched &&
          (
            (error && 
              <span className="text-danger m-3">
                {error}
              </span>
            ) || (
              warning && 
              <span className="text-warning">
                {warning}
              </span>
            ) 
          )
        }
      </div>
    )
  }

  render() {
    const { 
      formInput, 
      formInput: {
        element,
        value,
        id
      },
      handleInputChange 
    } = this.props;

    // richText label
    const label = convertDraftjsToHtml(formInput.label);

    // text label
    const labelText = 
      formInput.label.blocks &&
      formInput.label.blocks[0].text;

    return (
      <div>
        {/* -------------- INPUT TAG -------------- */}
        {
          element === "TextInput" &&
          (
            <div className="form-group">
              {this.forminputLabel(label, formInput.required)}
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
          )
        }

        {/* -------------- TEXTAREA -------------- */}
        {
          element === "TextArea" && 
          <div className="form-group">
            {this.forminputLabel(label, formInput.required)}
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
        }

        {/* -------------- NUMBER INPUT TAG -------------- */}
        {
          element === "NumberInput" && 
          <div className="form-group">
            {this.forminputLabel(label, formInput.required)}
            <Field 
              name={labelText}
              component={this.renderInputField} 
              type="number"
              isRequired={formInput.required}
              validate={formInput.required ? [required] : null} 
              value={formInput.value}
              id={formInput.id}
              handleInputChange={handleInputChange}
            />
          </div>
        }

        {/* -------------- DROPDOWN -------------- */}
        {
          element === "Dropdown" && 
          <div className="form-group">
            {this.forminputLabel(label, formInput.required)}
            <Field 
              name={labelText}
              component="select"
              className="form-control"
              validate={formInput.required ? [required] : null} 
              // handleInputChange={handleInputChange}
            >
             {
               formInput.options.map(option => (
                 <option 
                  key={option.id}
                  value={option.value}
                >
                  {option.value}
                </option>
               ))
             } 
            </Field>
          </div>
        }
      </div>
    )
  }
}

export default compose(
  connect(
    (state, { formInput: { element, id } }) => ({
      form: `${element}-${id}`,
    }),
    {
      handleInputChange
    }
  ),
  reduxForm()
)(ValidatedFormInputs);