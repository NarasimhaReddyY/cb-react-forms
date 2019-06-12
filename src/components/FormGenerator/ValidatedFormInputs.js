import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import makeAnimated from "react-select/animated";
import convertDraftjsToHtml from '../FormBuilder/FormInputs/convertDraftjsToHtml';
import { required } from './formValidations';
import { 
  handleInputChange, 
  handleCheckboxChange,
  handleTagsChange,
  handleRadioButtonChange 
} from '../../actions/formGeneratorActions';
import { 
  Header, 
  Paragraph, 
  Label,
} from '../FormBuilder/FormInputs';

class ValidatedFormInputs extends Component {

  showError = (touched, error, warning) => (
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
  )

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
          this.showError(touched, error, warning)
        }
      </div>
    )
  }

  renderDropdown = (
    {
      handleInputChange,
      id,
      value,
      isRequired,
      input,
      options,
      meta: {
        touched,
        error,
        warning
      }
    }
  ) => (
    <div className="form-group">
      <select 
        {...input}
        value={value}
        onChange={e => handleInputChange(id, e.target.value)}
        className="form-control"
        style={{ 
          borderColor: touched && isRequired && error ? 'red' : '',
         }}
      >
        <option value={null}></option>
        {
          options.map(option => (
            <option 
              key={option.id}
              value={option.value}
            >
              {option.value}
            </option>
          ))
        }
      </select>
      {
        this.showError(touched, error, warning)
      }
    </div>
  )

  renderCheckboxes = (
    {
      id,
      input,
      type,
      options,
      handleCheckboxChange,
      meta: {
        touched,
        error,
        warning
      }
    }
  ) => (
    <React.Fragment>
      <div className="form-group" {...input}>
        {
          options.map(({ id: optionId, value }) => (
            <div key={value} className="d-block">
              <label 
                className="form-label ml-2" 
                htmlFor={value}
              >
                <input 
                  id={value} 
                  type={type} 
                  name={value}
                  className="mr-2"
                  onChange={() => 
                    handleCheckboxChange(
                      id, 
                      optionId
                    )
                  }
                />
                {value}
              </label>
            </div>
          ))
        }
        {
          this.showError(touched, error, warning)
        }
      </div>
    </React.Fragment>
  )

  renderTags = (
    {
      id,
      input,
      options,
      value,
      animatedComponents,
      handleTagsChange,
      meta: {
        touched,
        error,
        warning
      }
    }
  ) => (
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
        {
          this.showError(touched, error, warning)
        }
      </div>
    </React.Fragment>
  );

  renderRadioButtons = (
    {
      id,
      input,
      option,
      value,
      handleRadioButtonChange,
      meta: {
        touched,
        error,
        warning
      }
    }
  ) => (
    <React.Fragment>
      <div className="d-block">
        <label className="form-label ml-2" htmlFor={value}>
          <input
            {...input} 
            id={value} 
            type="radio" 
            name={id}
            className="mr-2" 
            onChange={
              () => handleRadioButtonChange(id, option.id)
            }
          />
          {option.label}
        </label>
        {
          this.showError(touched, error, warning)
        }
      </div>
    </React.Fragment>
  );

  render() {
    // Animation for Tag Component
    const animatedComponents = makeAnimated();
    const { 
      formInput, 
      formInput: {
        id,
        element,
        value,
        options
      },
      handleInputChange,
      handleCheckboxChange,
      handleTagsChange,
      handleRadioButtonChange 
    } = this.props;

    let label, labelText;
    if(element !== "LineBreak") {
      // richText label
      label = convertDraftjsToHtml(formInput.label);
      
      // text label
      labelText = 
        formInput.label.blocks &&
        formInput.label.blocks[0].text;
    }


    return (
      <div>

        {/* -------------- HEADER -------------- */}
        {
          element === "Header" &&
          <Header item={{label: formInput.label}} />
        }

        {/* -------------- PARAGRAPH -------------- */}
        {
          element === "Paragraph" &&
          <Paragraph item={{label: formInput.label}} />
        }

        {/* -------------- LABEL -------------- */}
        {
          element === "Label" &&
          <Label item={{label: formInput.label}} />
        }

        {/* -------------- LINEBREAK -------------- */}
        {
          element === "LineBreak" &&
          <hr />
        }

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
              value={value}
              id={id}
              handleInputChange={handleInputChange}
            />
          </div>
        }

        {/* -------------- DROPDOWN -------------- */}
        {
          element === "Dropdown" && 
          <React.Fragment>
            {this.forminputLabel(label, formInput.required)}
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
        }

        {/* -------------- CHECKBOXES -------------- */}
        {
          element === "Checkboxes" &&
          <React.Fragment>
            {this.forminputLabel(label, formInput.required)}
            <Field 
              id={id}
              name={labelText}
              type="checkbox"
              component={this.renderCheckboxes}
              className="form-control"
              validate={formInput.required ? [required] : null}
              options={options}
              handleCheckboxChange={handleCheckboxChange}
            />
          </React.Fragment>
        }

        {/* -------------- Tags -------------- */}
        {
          element === "Tags" &&
          <React.Fragment>
            {this.forminputLabel(label, formInput.required)}
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
        }

        {/* -------------- RADIO BUTTONS -------------- */}
        {
          element === "RadioButtons" &&
          <React.Fragment>
            {this.forminputLabel(label, formInput.required)}
            <div className="form-group">
              {
                options.map(option => (
                  <React.Fragment key={option.id}>
                    <Field 
                      name={id}
                      id={id}
                      component={this.renderRadioButtons}
                      handleRadioButtonChange={handleRadioButtonChange}
                      option={option}
                    />
                  </React.Fragment>
                ))
              }
            </div>
          </React.Fragment>
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
      handleInputChange,
      handleCheckboxChange,
      handleTagsChange,
      handleRadioButtonChange
    }
  ),
  reduxForm()
)(ValidatedFormInputs);