import React, { Component } from 'react';
import Toolbar from './Toolbar';
import Preview from './Preview';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class FormBuilder extends Component {
  render() {
    return (
      <div className="row mt-3">
        <div className="col-md-8">
          <Preview/>
        </div>
        <div className="col-md-4">
          <Toolbar />
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(FormBuilder);