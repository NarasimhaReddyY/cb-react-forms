import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import previewItemsReducer from './formBuilderReducer';
import formGeneratorReducer from './formGeneratorReducer';

export default combineReducers({
  formBuilder: previewItemsReducer,
  formGenerator: formGeneratorReducer,
  form: formReducer
});