import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import convertDraftjsToHtml from '../FormBuilder/FormInputs/convertDraftjsToHtml';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { required } from './formValidations';
import { handleInputChange } from '../../actions/formGeneratorActions';

class ValidatedFormInputs extends Component {
  handleInputChange = (e, id) => {
    e.persist();
    this.props.handleInputChange(id, e.target.value);
  }

  renderField = (props) => {
    console.log('props', props)
    const { id, value, input, type, meta: { touched, error, warning } } = props;
    return (
      <div >
        <input 
          {...input}
          style={{ borderColor: touched && error ? 'red' : '' }}
          type={type}
          value={value}
          className="form-control"
          onChange={(e) => this.handleInputChange(e, id)} 
        />
        {
          touched && 
          ((error && <span className="text-danger m-3">{error}</span>) ||
            (warning && <span>{warning}</span>) 
          )
        }
      </div>
    )
  }

  render() {
    const { formInput, handleInputChange } = this.props;

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
              <span style={{ borderTop: '100%' }} className="badge badge-danger float-right">
                Required
              </span>
            ) : null}
            <p dangerouslySetInnerHTML={{ __html: label }} />
            <Field 
              component={this.renderField} 
              name={labelText}
              type="text"
              value={formInput.value}
              id={formInput.id}
              handleChange={handleInputChange}
              validate={[required]} 
            />
          </div>
        }
      </div>
    )
  }
}

export default compose(
  connect(
    (state, props) => ({
      form: props.formInput.element,
    }),
    {
      handleInputChange
    }
  ),
  reduxForm()
)(ValidatedFormInputs);