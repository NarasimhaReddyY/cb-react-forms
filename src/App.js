import React from 'react';
import { Provider } from 'react-redux';
import FormBuilder from './components/FormBuilder';
import store from './store';

import './App.scss';

const App = () => (
  <Provider store={store}>
    <div className="container">
      <FormBuilder/>
    </div>
  </Provider>
);

export default App;