import React from 'react';
import FormBuilder from './FormBuilder';

import './App.scss';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-8"></div>
      <div className="col-md-4">
       <FormBuilder/>
      </div> 
    </div>
  </div>
);

export default App;