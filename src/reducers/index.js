import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";
import previewItemsReducer from "./formBuilderReducer";

export default combineReducers({
  formBuilder: previewItemsReducer,
  form: formReducer
});
