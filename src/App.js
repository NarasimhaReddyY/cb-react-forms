import React from "react";
import FormBuilder from "./components/FormBuilder";
import FormGenerator from "./components/FormGenerator";
import { Provider } from "react-redux";
import store from "./store";
import "./App.scss";

const userFormData = [{"id":"bdd84b40-fedc-420d-a7b8-20f8d0e30029","element":"Header","label":{"blocks":[{"key":"7v3oc","text":"Admission Form","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":14,"style":"BOLD"},{"offset":0,"length":14,"style":"fontsize-30"}],"entityRanges":[],"data":{"text-align":"center"}}],"entityMap":{}}},{"id":"23ec6bb9-73e2-4357-a2ae-d6778eaed457","element":"LineBreak"},{"id":"e8f20201-a352-4a8a-b96c-c80f14177a96","element":"Paragraph","label":{"blocks":[{"key":"8kbm3","text":"Admission form for professional course. Please fill in all the required fields.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":79,"style":"fontsize-18"}],"entityRanges":[],"data":{}}],"entityMap":{}}},{"id":"c58557f5-1ae5-4469-b12e-31afdbcdbb7a","element":"TextInput","required":true,"label":{"blocks":[{"key":"89k9c","text":"Name of the applicant","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},"value":""},{"id":"1783c390-54c0-410b-8d7c-683e88fc4cac","element":"NumberInput","required":true,"label":{"blocks":[{"key":"9rq07","text":"Age:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},"value":0},{"id":"424645e8-c78e-4a01-aaf3-efe6ebc3f420","element":"Paragraph","label":{"blocks":[{"key":"3fhaj","text":"Placeholder Label","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"center"}}],"entityMap":{}}},{"id":"18a9df97-4293-4ff2-87fe-82e41ec3f6c3","element":"TextInput","required":true,"label":{"blocks":[{"key":"7l9sf","text":"Placeholder Label","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"center"}}],"entityMap":{}},"value":""}];

const responseData = {"c58557f5-1ae5-4469-b12e-31afdbcdbb7a":"Sachin","1783c390-54c0-410b-8d7c-683e88fc4cac":"20"};

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <FormBuilder
          onSubmit={data => console.log(data)}
          // items={[]}
        />

        <FormGenerator
          formData={userFormData}
          responseData={responseData}
          // readOnly={true}
          onSubmit={data => console.log(JSON.stringify(data))}
        />
      </div>
    </Provider>
  );
};

export default App;
