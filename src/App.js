import React from 'react';
import { Provider } from 'react-redux';
import FormBuilder from './components/FormBuilder';
import store from './store';

import './App.scss';

const App = () => (
  <Provider store={store}>
    <FormBuilder />
  </Provider>
);

export default App;