import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import switchItems from '../FormBuilder/FormInputs/switchItems';
import { hideDemo } from '../../actions/formGeneratorActions';

class FormGenerator extends Component {
  render() {
    const { formData, hideDemo } = this.props;
    return (
      <div className="demo-form">
        <div 
          className="jumbotron bg-default mt-3 mx-auto" 
          style={{ 
            height: '100%', 
            maxWidth: '700px', 
            border: '1px solid #ccc' 
          }}
        >
          <div>
            <span 
              className="float-right" 
              style={{ cursor: 'pointer' }} 
              onClick={hideDemo}
            >
              <i className="fa fa-times" />
            </span>
          </div>
          {
            map(formData, item => (
              <div key={item.id} className="mb-4">
                {
                  switchItems(item)
                }
              </div>
            ))
          }  
          <div style={{ height: '50px' }} className="mt-5">
            <hr/> 
            <button 
              className="btn btn-outline-secondary float-right" 
              onClick={hideDemo}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => (
    { 
      formData: state.formGenerator.formData 
    }
  ), {
    hideDemo
  }
)(FormGenerator);