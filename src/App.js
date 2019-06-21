import React from 'react';
import FormBuilder from './components/FormBuilder';
import FormGenerator from './components/FormGenerator';
import { connect } from 'react-redux';
import './App.scss';

const App = ({ demoVisible }) => {
  return(
    <div className="container">
      <FormBuilder 
        onSubmit={(data) => console.log(data)}
        // items={[]}
      />
      {
        demoVisible &&
        <FormGenerator 
          userFormData={userFormData}
          responseData={responseData}
          readOnly={true}
          onSubmit={(data) => console.log(JSON.stringify(data))} 
        />
      }
    </div>
  )
};

export default connect(
  state => (
    {
      demoVisible: state.formGenerator.demoVisible
    }
  ), null
)(App);