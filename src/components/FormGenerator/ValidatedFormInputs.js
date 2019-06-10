import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import convertDraftjsToHtml from '../FormBuilder/FormInputs/convertDraftjsToHtml';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { required } from './formValidations';
import { handleInputChange } from '../../actions/formGeneratorActions';

class ValidatedFormInputs extends Component {

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
        <input 
          {...input}
          style={{ 
            borderColor: touched && isRequired && error ? 'red' : '' 
          }}
          type={type}
          // value={value}
          className="form-control"
          // onChange={e => handleInputChange(id, e.target.value)} 
        />
        {
          touched &&
          isRequired && 
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

  renderTextArea = (props) => {
    const { 
      id, 
      handleInputChange, 
      value, 
      input, 
      type, 
      meta: { 
        touched, 
        error, 
        warning 
      } 
    } = props;
    
    return (
      <div >
        <textarea 
          {...input}
          style={{ 
            borderColor: touched && error ? 'red' : '' 
          }}
          type={type}
          value={value}
          className="form-control"
          onChange={e => handleInputChange(id, e.target.value)} 
        />
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
        {
          formInput.element === "TextInput" && 
          <div className="form-group">
            {formInput.required ? (
              <span 
                style={{ borderTop: '100%' }} 
                className="badge badge-danger float-right"
              >
                Required
              </span>
            ) : null}
            <p dangerouslySetInnerHTML={{ __html: label }} />
            <Field 
              name={labelText}
              component={this.renderInputField}
              type="text"
              label={labelText} 
              validate={[required]}
              isRequired={formInput.required}
              // value={formInput.value}
              id={formInput.id}
              // handleInputChange={handleInputChange}
            />
          </div>
        }

        {
          formInput.element === "TextArea" && 
          <div className="form-group">
            {formInput.required ? (
              <span 
                style={{ borderTop: '100%' }} 
                className="badge badge-danger float-right"
              >
                Required
              </span>
            ) : null}
            <p dangerouslySetInnerHTML={{ __html: label }} />
            <Field 
              name={labelText}
              component={this.renderTextArea} 
              type="textarea"
              validate={[required]} 
              value={formInput.value}
              id={formInput.id}
              handleInputChange={handleInputChange}
            />
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