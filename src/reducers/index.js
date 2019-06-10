import previewItemsReducer from './formBuilderReducer';
import formGeneratorReducer from './formGeneratorReducer';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

export default combineReducers({
  formBuilder: previewItemsReducer,
  formGenerator: formGeneratorReducer,
  form: formReducer
});