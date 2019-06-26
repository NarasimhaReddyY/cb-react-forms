import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import Generator from "./src/components/FormGenerator";

const FormGenerator = ({ 
  formData, 
  responseData, 
  readOnly, 
  onSubmit 
}) => (
  <Provider store={store}>
    <Generator 
      formData={formData} 
      responseData={responseData} 
      readOnly={readOnly} 
      onSubmit={onSubmit} 
    />
  </Provider>
)

export default FormGenerator;