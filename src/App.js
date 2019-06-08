import React from 'react';
import FormBuilder from './components/FormBuilder';
import FormGenerator from './components/FormGenerator';
import { connect } from 'react-redux';
import './App.scss';

const App = ({ demoVisible }) => {
  return(
    <div className="container">
      <FormBuilder />
      {
        demoVisible &&
        <FormGenerator />
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