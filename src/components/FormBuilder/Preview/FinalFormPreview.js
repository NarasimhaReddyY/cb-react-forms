import React, { Component } from 'react';
import switchItems from '../FormInputs/switchItems';
import data from '../../../dummyFormData.json';

class FinalFormPreview extends Component {
  render() {
    console.log('data', data);
    console.log('props', this.props.data);
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

          {
            // this.props.data.map(item => (
            data.map(item => (
              <div key={item.id} className="mb-4">
                  {
                    switchItems(item)
                  }
              </div>
            ))
          }
          <div style={{ height: '50px' }} className="mt-5">
            <hr/> 
            {/* <button className="btn btn-primary" onClick={() => console.log(JSON.stringify(this.props.data))}>FinalDataInConsole</button> */}
            <button className="btn btn-outline-secondary float-right" onClick={this.props.hideFinalPreview}>Close</button>
          </div>
        </div>
      </div>
    )
  }
}

export default FinalFormPreview;