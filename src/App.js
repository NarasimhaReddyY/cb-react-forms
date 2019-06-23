import React from "react";
import FormBuilder from "./components/FormBuilder";
import FormGenerator from "./components/FormGenerator";
import "./App.scss";

const App = () => {
  return (
    <div className="container">
      <FormBuilder
        onSubmit={data => console.log(data)}
        // items={[]}
      />

      {/* <FormGenerator
        formData={userFormData}
        responseData={responseData}
        readOnly={true}
        onSubmit={data => console.log(JSON.stringify(data))}
      /> */}
    </div>
  );
};

export default App;
