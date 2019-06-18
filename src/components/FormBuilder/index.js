import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { compose } from "redux";
import { connect } from 'react-redux';
import FormEditor from './FormEditor';
import Toolbar from './Toolbar';
import Preview from './Preview';

class FormBuilder extends Component {
  render() {
    return (
      <React.Fragment>
        {
          this.props.editorVisible &&
          <FormEditor /> 
        }
        <div className="container">
          <div className="row mt-3">
            <div className="col-md-8">
              <Preview />
            </div>
            <div className="col-md-4">
              <Toolbar />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default compose(
  connect(
    state => ({ 
      editorVisible : state.formBuilder.editorVisible 
    }), 
    null
  ),
  DragDropContext(HTML5Backend)
)(FormBuilder);