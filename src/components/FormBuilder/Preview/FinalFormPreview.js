import React, { Component } from 'react';
import switchItems from '../FormInputs/switchItems';


class FinalFormPreview extends Component {
  render() {
    return (
      <div className="final-preview">
        <div 
          className="jumbotron bg-default mt-3 mx-auto" 
          style={{ 
            height: '100%', 
            maxWidth: '700px', 
            border: '1px solid #ccc' 
          }}
        >
          <div style={{ height: '50px' }}>
            <h4 className="float-left">Preview</h4>
            <button className="btn btn-danger float-right" onClick={this.props.hideFinalPreview}>Close</button>
          </div>

          {
            this.props.data.map(item => (
              <div key={item.id} className="mb-4">
                  {
                    switchItems(item)
                  }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default FinalFormPreview;