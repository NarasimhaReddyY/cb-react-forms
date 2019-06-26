import React from "react";
import { Provider } from "react-redux";
import Builder from "./src/components/FormBuilder";
import store from "./src/store";

import "react-rangeslider/lib/index.css";
import "./src/App.scss";

const FormBuilder = ({ onSubmit, items }) => (
  <Provider store={store}>
    <Builder 
      onSubmit={onSubmit} 
      items={items} 
    />
  </Provider>
)

export default FormBuilder